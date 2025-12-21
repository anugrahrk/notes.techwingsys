import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const maxDuration = 60; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const host = req.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const url = `${baseUrl}/track/${slug}`;

  let browser;

  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    browser = await puppeteer.launch({
      args: isProduction ? chromium.args : ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: isProduction 
        ? await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar')
        : "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: true,
    });

    const page = await browser.newPage();

    const cookieStore = await cookies();
    const cookieList = (await cookieStore.getAll()) as any[];

    const puppeteerCookies = cookieList.map((c) => {
      let sameSite: "Lax" | "Strict" | "None" = "Lax";
      const ss = c.sameSite?.toLowerCase();
      if (ss === "strict") sameSite = "Strict";
      if (ss === "none") sameSite = "None";

      return {
        name: c.name,
        value: c.value,
        domain: new URL(baseUrl).hostname,
        path: c.path || "/",
        httpOnly: c.httpOnly ?? false,
        secure: protocol === 'https' ? true : (c.secure ?? false),
        sameSite: sameSite,
      };
    });

    await page.browserContext().setCookie(...puppeteerCookies);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });

    const pdf = await page.pdf({ 
      format: "A4", 
      printBackground: true 
    });

    await browser.close();

    return new Response(pdf as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF Error:", error.message);
    if (browser) await browser.close();
    return NextResponse.json({ error: error.message || "Failed to generate PDF" }, { status: 500 });
  }
}