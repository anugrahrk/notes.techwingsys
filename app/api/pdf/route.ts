import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const baseUrl = process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
  const url = `${baseUrl}/track/${slug}`;

  let browser;

  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
   const browser = await puppeteer.launch({
  args: isProduction ? chromium.args : ["--no-sandbox"],
  executablePath: isProduction 
    ? await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar')
    : process.platform === 'win32' 
        ? "C:/Program Files/Google/Chrome/Application/chrome.exe" 
        : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

    const page = await browser.newPage();

    const cookieStore = await cookies();
    const cookieList = cookieStore.getAll() as ResponseCookie[];
   const puppeteerCookies = cookieList.map((c) => {
      // Map SameSite carefully to Puppeteer's expected Capitalized literals
      let sameSite: "Lax" | "Strict" | "None" | undefined = undefined;
      if (c.sameSite === "lax") sameSite = "Lax";
      else if (c.sameSite === "strict") sameSite = "Strict";
      else if (c.sameSite === "none") sameSite = "None";

      return {
        name: c.name,
        value: c.value,
        domain: new URL(baseUrl).hostname,
        path: c.path || "/",
        httpOnly: c.httpOnly ?? false,
        secure: c.secure ?? false,
        sameSite: sameSite,
      };
    });

    await page.setCookie(...puppeteerCookies);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    const pdf = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return new Response(pdf as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}