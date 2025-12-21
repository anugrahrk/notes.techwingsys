import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"; // For precise typing

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const baseUrl = process.env.NEXTAUTH_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: "Config error" }, { status: 500 });
  }

  const url = `${baseUrl}/track/${slug}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // 1. Await the cookie store (Next.js 15 pattern)
    const cookieStore = await cookies();
    // 2. Cast to ResponseCookie[] to access httponly, secure, samesite
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

    await page.browserContext().setCookie(...puppeteerCookies);

    await page.goto(url, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // 3. Fix Response type error by casting pdf (Uint8Array) to any or BodyInit
    return new Response(pdf as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    if (browser) await browser.close();
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}