import type { Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import { SmoothScroll } from "@/lib/animations/lenis";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { DemoDialog } from "@/components/layout/DemoDialog/DemoDialog";
import { CursorGlow } from "@/components/ui/CursorGlow/CursorGlow";
import "./globals.scss";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
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
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <DemoDialog />
          <CursorGlow />
        </SmoothScroll>
      </body>
    </html>
  );
}
