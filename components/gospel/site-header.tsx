/**
 * Module: GospelSiteHeader
 * Context: Ported from ishgospel-web — glassmorphism sticky nav, product-level.
 *
 * Sticky frosted nav for gospel.ishverse.com: IshGospel logo, anchor links
 * (hidden on small screens), theme toggle, and the get-the-app CTA. English-only
 * until the i18n phase.
 *
 * Exports:
 *   GospelSiteHeader — server component (toggle is a client island)
 */

import Link from "next/link";
import { Smartphone } from "lucide-react";
import { GospelLogo } from "./logo";
import { ThemeToggle } from "../theme-toggle";
import { gospelConfig } from "@/lib/gospel";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pillars", label: "Pillars" },
  { href: "#pricing", label: "Pricing" },
  { href: "#waitlist", label: "Download" },
] as const;

export function GospelSiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label={gospelConfig.name}>
          <GospelLogo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={gospelConfig.store.appStore}
            className="inline-flex items-center gap-2 rounded-[10px] bg-fg px-4 py-2.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            <Smartphone className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Get the app</span>
            <span className="sm:hidden">App</span>
          </a>
        </div>
      </div>
    </header>
  );
}
