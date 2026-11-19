import type { Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import { SmoothScroll } from "@/lib/animations/lenis";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow/CursorGlow";
import { SiteChrome } from "@/components/auth/SiteChrome";
import "./globals.scss";

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#080A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <SiteChrome>
            <Navbar />
          </SiteChrome>
          <main id="main">{children}</main>
          <SiteChrome>
            <Footer />
          </SiteChrome>
          <CursorGlow />
        </SmoothScroll>
      </body>
    </html>
  );
}
