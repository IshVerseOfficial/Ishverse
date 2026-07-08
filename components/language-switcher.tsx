/**
 * Module: LanguageSwitcher
 * Context: See implementation_plan.md Phase 4 — en/es/fr/pt.
 *
 * Custom dropdown that mirrors the mobile app's LanguagePickerSheet: flag
 * emoji, native name as primary label, English name as secondary. Subdomain-
 * aware: on gospel.* / rize.* the public URL has no product segment, so we
 * navigate to just the locale prefix (e.g. /es) and let the middleware rewrite
 * to the correct internal path.
 *
 * Exports:
 *   LanguageSwitcher — client component
 */

"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { routing, type Locale } from "@/i18n/routing";

interface LangMeta {
  code: Locale;
  flag: string;
  nativeName: string;
  englishName: string;
}

const LANGUAGES: LangMeta[] = [
  { code: "en", flag: "🇬🇧", nativeName: "English", englishName: "English" },
  { code: "es", flag: "🇪🇸", nativeName: "Español", englishName: "Spanish" },
  { code: "fr", flag: "🇫🇷", nativeName: "Français", englishName: "French" },
  { code: "pt", flag: "🇵🇹", nativeName: "Português", englishName: "Portuguese" },
];

const PRODUCT_SUBDOMAINS = new Set(["gospel", "rize"]);

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;

    const sub = window.location.hostname.split(".")[0];
    const isProduct = PRODUCT_SUBDOMAINS.has(sub);

    // On product subdomains the public URL carries no product segment —
    // navigate to just the locale prefix. The middleware rewrites /es →
    // /es/gospel (etc.) internally. On the main domain preserve the path.
    let publicPath: string;
    if (isProduct) {
      publicPath = next === routing.defaultLocale ? "/" : `/${next}`;
    } else {
      // Strip the current locale prefix from window.location.pathname manually
      // (usePathname from next-intl can lag behind during navigation).
      const rawPath = window.location.pathname;
      const strippedPath = (() => {
        for (const l of routing.locales) {
          if (l === routing.defaultLocale) continue;
          if (rawPath === `/${l}` || rawPath.startsWith(`/${l}/`)) {
            return rawPath.slice(l.length + 1) || "/";
          }
        }
        return rawPath;
      })();
      const prefix = next === routing.defaultLocale ? "" : `/${next}`;
      publicPath = prefix + (strippedPath === "/" ? "" : strippedPath) || "/";
    }

    window.location.assign(publicPath);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.nativeName}`}
        className="flex h-9 items-center gap-1.5 rounded-[10px] border border-divider bg-transparent px-2.5 text-[13px] text-fg transition-colors hover:bg-glass-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="text-base leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden sm:inline text-fg-secondary">{current.nativeName}</span>
        {/* Chevron */}
        <svg
          className={`h-3 w-3 text-fg-secondary transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[168px] overflow-hidden rounded-[12px] border border-divider bg-bg shadow-lg"
        >
          {LANGUAGES.map((lang) => {
            const selected = lang.code === locale;
            return (
              <li key={lang.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => switchTo(lang.code)}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-glass-bg ${selected ? "bg-glass-bg" : ""}`}
                >
                  <span className="text-xl leading-none" aria-hidden>
                    {lang.flag}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block text-[13px] font-medium ${selected ? "text-fg" : "text-fg-secondary"}`}
                    >
                      {lang.nativeName}
                    </span>
                    {lang.nativeName !== lang.englishName && (
                      <span className="block text-[11px] text-fg-secondary opacity-60">
                        {lang.englishName}
                      </span>
                    )}
                  </span>
                  {selected && (
                    <svg
                      className="h-4 w-4 shrink-0 text-accent"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 8l3.5 3.5 6.5-7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
