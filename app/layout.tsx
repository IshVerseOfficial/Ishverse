/**
 * Module: Root Layout
 * Context: See DESIGN.md §3–§4 — tokens, Inter via next/font, two-theme system.
 *
 * Loads Inter (no layout shift), applies theme Providers, and defines the
 * site-wide SEO metadata from siteConfig. i18n is deferred to Phase 4
 * (implementation_plan.md) — English-only until then.
 *
 * Exports:
 *   metadata — site-wide SEO metadata
 *   default  — RootLayout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-fg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
