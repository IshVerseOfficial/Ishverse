/**
 * Module: SiteHeader
 * Context: See DESIGN.md §8 — company-level nav, localized (Phase 4).
 *
 * Sticky frosted nav: logo, anchor links (hidden on small screens), language
 * switcher, theme toggle, and the primary CTA to the flagship product.
 *
 * Exports:
 *   SiteHeader — server component (switcher + toggle are client islands)
 */

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const t = useTranslations("company.nav");
  const flagship = siteConfig.products[0];

  const links = [
    { href: "#products", label: t("products") },
    { href: "#story", label: t("story") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label={siteConfig.name}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
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
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
          <a
            href={flagship.href}
            className="inline-flex items-center gap-2 rounded-[10px] bg-fg px-4 py-2.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            <span className="hidden sm:inline">{t("explore")}</span>
            <span className="sm:hidden">{flagship.name}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}
