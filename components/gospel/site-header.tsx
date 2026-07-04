/**
 * Module: GospelSiteHeader
 * Context: Ported from ishgospel-web — glassmorphism sticky nav, product-level.
 * Localized (Phase 4).
 *
 * Exports:
 *   GospelSiteHeader — server component (switcher + toggle are client islands)
 */

import { useTranslations } from "next-intl";
import { Smartphone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GospelLogo } from "./logo";
import { ThemeToggle } from "../theme-toggle";
import { LanguageSwitcher } from "../language-switcher";
import { gospelConfig } from "@/lib/gospel";

export function GospelSiteHeader() {
  const t = useTranslations("gospel");

  const links = [
    { href: "#features", label: t("nav.features") },
    { href: "#pillars", label: t("nav.pillars") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#waitlist", label: t("footer.linkDownload") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label={gospelConfig.name}>
          <GospelLogo />
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
            href={gospelConfig.store.appStore}
            className="inline-flex items-center gap-2 rounded-[10px] bg-fg px-4 py-2.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            <Smartphone className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{t("nav.getApp")}</span>
            <span className="sm:hidden">{t("nav.getAppShort")}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
