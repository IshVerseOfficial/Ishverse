/**
 * Module: Subdomain + Locale Middleware
 * Context: See implementation_plan.md — one repo serves the company site and
 * every product landing page via subdomain rewrites, in four languages
 * (Phase 4).
 *
 * Order of operations:
 *   1. Product subdomains (gospel.*, rize.*) rewrite the path to the internal
 *      segment: gospel.ishverse.com/es → internal /es/gospel. The locale
 *      prefix in the public URL is preserved ahead of the product segment.
 *      Rewriting is done with NextResponse.rewrite() directly — NOT via
 *      handleI18nRouting — so that next-intl's own middleware cannot interfere
 *      with the already-correct internal path (it was redirecting product
 *      subdomain requests back to the root locale page).
 *   2. Legal paths on rize.* 308-redirect to company pages (gospel has its own).
 *   3. Main domain (ishverse.com) passes through next-intl's middleware as
 *      normal.
 *
 * Exports:
 *   middleware — subdomain router + locale resolution
 *   config     — matcher (skips _next, api routes, and static files)
 */

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, locales, defaultLocale, type Locale } from "./i18n/routing";

const handleI18nRouting = createMiddleware({ ...routing, localeDetection: false });

const PRODUCT_SUBDOMAINS = new Set(["gospel", "rize"]);
// gospel has its own /privacy, /terms, /about pages — only redirect rize
const RIZE_LEGAL_PATHS = new Set(["/privacy", "/terms"]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const sub = host.split(".")[0];

  // Main domain — hand off to next-intl entirely.
  if (!PRODUCT_SUBDOMAINS.has(sub)) return handleI18nRouting(req);

  // Product subdomains — build the internal path ourselves.
  const segments = req.nextUrl.pathname.split("/");
  const hasLocale = locales.includes(segments[1] as Locale);
  const locale = hasLocale ? (segments[1] as Locale) : null;
  const rest = "/" + segments.slice(hasLocale ? 2 : 1).join("/");

  if (sub !== "gospel" && RIZE_LEGAL_PATHS.has(rest)) {
    return NextResponse.redirect(`https://ishverse.com${rest}`, 308);
  }

  // Tolerate paths that already carry the product segment.
  const needsSegment = rest !== `/${sub}` && !rest.startsWith(`/${sub}/`);
  // Always include the locale segment so Next.js App Router [locale] param
  // resolves correctly. Without it, /gospel is matched as locale="gospel"
  // which fails hasLocale() and returns 404 for the default-locale route.
  const resolvedLocale = locale ?? defaultLocale;
  const internal =
    `/${resolvedLocale}` + (needsSegment ? `/${sub}${rest === "/" ? "" : rest}` : rest);

  // Rewrite directly. Passing the rewritten request through handleI18nRouting
  // caused it to strip the product path segment and serve the wrong page.
  const url = req.nextUrl.clone();
  url.pathname = internal;
  const response = NextResponse.rewrite(url);

  // Mirror the NEXT_LOCALE cookie that next-intl normally sets so that
  // useLocale() and getLocale() in client components stay consistent.
  response.cookies.set("NEXT_LOCALE", resolvedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  // "app" excluded so rize.ishverse.com/app/* bypasses this middleware
  // and falls through to the beforeFiles rewrite in next.config.ts.
  matcher: ["/((?!_next|api|app|.*\\..*).*)"],
};
