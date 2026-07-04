/**
 * Module: i18n Routing
 * Context: See implementation_plan.md Phase 4 — mirror the mobile app's
 * languages (en/es/fr/pt).
 *
 * Single source of truth for supported locales + default. `as-needed` keeps the
 * default locale (English) at the root (/) and prefixes the others (/es, /fr, /pt).
 *
 * Exports:
 *   routing — next-intl routing config
 *   locales, defaultLocale — convenience re-exports
 */

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export type Locale = (typeof routing.locales)[number];
