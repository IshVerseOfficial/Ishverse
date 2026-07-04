/**
 * Module: Subdomain + Locale Middleware
 * Context: See implementation_plan.md — one repo serves the company site and
 * every product landing page via subdomain rewrites, in four languages
 * (Phase 4).
 *
 * Order of operations:
 *   1. Product subdomains (gospel.*, rize.*) get their path rewritten to the
 *      internal segment: gospel.ishverse.com/es → /es/gospel. A locale prefix
 *      in the public URL is preserved in front of the product segment. Paths
 *      that already carry the product segment (e.g. from a locale switch) are
 *      tolerated as-is.
 *   2. Legal paths on product subdomains 308-redirect to the company pages.
 *   3. next-intl then resolves the locale (localePrefix "as-needed", no
 *      auto-detect redirects — language changes only via the switcher).
 *
 * Exports:
 *   middleware — subdomain router + locale resolution
 *   config     — matcher (skips _next, api routes, and static files)
 */

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, locales, type Locale } from "./i18n/routing";

const handleI18nRouting = createMiddleware({ ...routing, localeDetection: false });

const PRODUCT_SUBDOMAINS = new Set(["gospel", "rize"]);
const COMPANY_LEGAL_PATHS = new Set(["/privacy", "/terms"]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const sub = host.split(".")[0];

  if (!PRODUCT_SUBDOMAINS.has(sub)) return handleI18nRouting(req);

  // Split an optional leading locale off the public path.
  const segments = req.nextUrl.pathname.split("/");
  const hasLocale = locales.includes(segments[1] as Locale);
  const locale = hasLocale ? segments[1] : null;
  const rest = "/" + segments.slice(hasLocale ? 2 : 1).join("/");

  if (COMPANY_LEGAL_PATHS.has(rest)) {
    return NextResponse.redirect(`https://ishverse.com${rest}`, 308);
  }

  // Tolerate paths that already carry the product segment.
  const needsSegment = rest !== `/${sub}` && !rest.startsWith(`/${sub}/`);
  const internal =
    (locale ? `/${locale}` : "") + (needsSegment ? `/${sub}${rest === "/" ? "" : rest}` : rest);

  const url = req.nextUrl.clone();
  url.pathname = internal;
  return handleI18nRouting(new NextRequest(url, req));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
