import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Techwingsys Notes | Free Technical Learning Paths",
    template: "%s | Techwingsys"
  },
  description: "Techwingsys provides comprehensive notes and progress tracking for MongoDB, JavaScript, and modern web development.",
  keywords: ["Techwingsys", "Techwings notes","Techwings","kochi", "MongoDB notes", "programming roadmaps"], 
  authors: [{ name: "Techwingsys" }],
  openGraph: {
    title: "Techwingsys Notes",
    description: "Master tech stacks with Techwingsys progress tracking.",
    url: "https://notes-techwingsys.vercel.app",
    siteName: "Techwingsys",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="h-screen">
          <Analytics/><SpeedInsights/>
            <BackgroundRippleEffect className="no-print"/>
          {children}
          </div>
        </Providers>
        
      </body>
    </html>
  );
}
