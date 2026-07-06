/**
 * Module: RizeSiteHeader
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — mirrors
 * GospelSiteHeader: glassmorphism sticky nav, product-level. Localized.
 *
 * Exports:
 *   RizeSiteHeader — server component (switcher + toggle are client islands)
 */

import { useTranslations } from "next-intl";
import { LogIn } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RizeLogo } from "./logo";
import { ThemeToggle } from "../theme-toggle";
import { LanguageSwitcher } from "../language-switcher";
import { rizeConfig } from "@/lib/rize";

export function RizeSiteHeader() {
  const t = useTranslations("rize");

  const links = [
    { href: "#features", label: t("nav.features") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#audiences", label: t("nav.institutions") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label={rizeConfig.name}>
          <RizeLogo />
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
            href={rizeConfig.app.web}
            className="hidden items-center gap-1.5 text-[13px] text-fg-secondary transition-colors hover:text-fg sm:inline-flex"
          >
            <LogIn className="h-3.5 w-3.5" aria-hidden />
            {t("nav.signIn")}
          </a>
          <a
            href={`mailto:${rizeConfig.contact}?subject=IshRize%20Demo`}
            className="inline-flex items-center gap-2 rounded-[10px] bg-fg px-4 py-2.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            <span className="hidden sm:inline">{t("nav.requestDemo")}</span>
            <span className="sm:hidden">{t("nav.requestDemoShort")}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
