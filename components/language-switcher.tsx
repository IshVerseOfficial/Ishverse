/**
 * Module: LanguageSwitcher
 * Context: See implementation_plan.md Phase 4 — en/es/fr/pt.
 *
 * Native <select> (accessible, zero-JS-dependency) that switches locale while
 * preserving the current page. Subdomain-aware: on gospel.ishverse.com /
 * rize.ishverse.com the internal pathname carries the product segment
 * ("/gospel"), which must NOT appear in the public URL — it is stripped and
 * the locale prefix applied to the remainder ("/", "/es", …).
 *
 * Exports:
 *   LanguageSwitcher — client component
 */

"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

const PRODUCT_SUBDOMAINS = new Set(["gospel", "rize"]);

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // internal, locale-stripped, e.g. "/gospel"

  const switchTo = (next: Locale) => {
    let path = pathname;
    const sub = window.location.hostname.split(".")[0];
    if (PRODUCT_SUBDOMAINS.has(sub)) {
      const segments = path.split("/");
      if (segments[1] === sub) path = "/" + segments.slice(2).join("/");
    }
    const prefix = next === routing.defaultLocale ? "" : `/${next}`;
    const target = `${prefix}${path === "/" ? "" : path}` || "/";
    window.location.assign(target);
  };

  return (
    <label className="relative inline-flex items-center">
      <Globe
        className="pointer-events-none absolute left-2.5 h-4 w-4 text-fg-secondary"
        aria-hidden
      />
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        className="h-9 cursor-pointer appearance-none rounded-[10px] border border-divider bg-transparent pl-8 pr-3 text-[13px] text-fg outline-none hover:bg-glass-bg focus:border-accent"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="bg-bg text-fg">
            {LABELS[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
