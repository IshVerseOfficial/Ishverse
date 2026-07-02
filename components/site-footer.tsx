/**
 * Module: SiteFooter
 * Context: See DESIGN.md §10 — footer: products, legal, contact.
 *
 * Minimal company footer: wordmark + tagline, the product ecosystem, company
 * contact addresses, and legal links (/privacy, /terms — pages land in
 * implementation_plan.md Phase 2). Single column on mobile, multi-column on
 * desktop.
 *
 * Exports:
 *   SiteFooter — server component
 */

import Link from "next/link";
import { Logo } from "./logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-fg-secondary">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <p className="text-[13px] font-medium text-fg">Products</p>
          <ul className="mt-3 space-y-2">
            {siteConfig.products.map((p) =>
              p.status === "live" ? (
                <li key={p.name}>
                  <a
                    href={p.href}
                    className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
                  >
                    {p.name}
                  </a>
                </li>
              ) : (
                <li key={p.name} className="text-[13px] text-fg-secondary">
                  {p.name} <span className="text-gold">· soon</span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-medium text-fg">Company</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-medium text-fg">Legal</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-divider">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[12px] text-fg-secondary sm:px-8">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
