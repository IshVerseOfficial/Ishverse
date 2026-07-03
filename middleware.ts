/**
 * Module: Subdomain Middleware
 * Context: See implementation_plan.md — one repo serves the company site and
 * every product landing page via subdomain rewrites.
 *
 * gospel.ishverse.com/* → /gospel/* and rize.ishverse.com/* → /rize/*
 * (rewrites — the URL in the browser stays on the subdomain). Legal paths on
 * product subdomains redirect permanently to the company-wide pages on
 * ishverse.com. Any other host (apex, www, localhost, *.vercel.app) passes
 * through untouched.
 *
 * Exports:
 *   middleware — subdomain router
 *   config     — matcher (skips _next, api routes, and static files)
 */

import { NextRequest, NextResponse } from "next/server";

const PRODUCT_SUBDOMAINS = new Set(["gospel", "rize"]);
const COMPANY_LEGAL_PATHS = new Set(["/privacy", "/terms"]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  const sub = host.split(".")[0];

  if (!PRODUCT_SUBDOMAINS.has(sub)) return NextResponse.next();

  const { pathname } = req.nextUrl;

  if (COMPANY_LEGAL_PATHS.has(pathname)) {
    return NextResponse.redirect(`https://ishverse.com${pathname}`, 308);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${sub}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
