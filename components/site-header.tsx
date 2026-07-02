/**
 * Module: SiteHeader
 * Context: See DESIGN.md §8 — ported from ishgospel-web, company-level nav.
 *
 * Sticky frosted nav: logo, anchor links (hidden on small screens), theme
 * toggle, and the primary CTA to the flagship product. Strings are English-only
 * until the i18n phase (implementation_plan.md Phase 4).
 *
 * Exports:
 *   SiteHeader — server component (theme toggle is a client island)
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/site";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const flagship = siteConfig.products[0];

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label={siteConfig.name}>
          <Logo />
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
            href={flagship.href}
            className="inline-flex items-center gap-2 rounded-[10px] bg-fg px-4 py-2.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            <span className="hidden sm:inline">Explore {flagship.name}</span>
            <span className="sm:hidden">{flagship.name}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}
