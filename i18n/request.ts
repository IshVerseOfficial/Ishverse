/**
 * Module: i18n Request Config
 * Context: next-intl per-request config — resolves the active locale and loads
 * its message catalog.
 *
 * Picked up automatically by the next-intl plugin (createNextIntlPlugin in
 * next.config). Falls back to the default locale for unknown/missing locales.
 *
 * Exports:
 *   default — getRequestConfig handler
 */

import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = routing.locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
