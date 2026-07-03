/**
 * Module: GospelSiteFooter
 * Context: Ported from ishgospel-web — Ish ecosystem family footer, with legal
 * links pointing at the company-wide pages on ishverse.com.
 *
 * Exports:
 *   GospelSiteFooter — server component
 */

import { GospelLogo } from "./logo";
import { gospelConfig } from "@/lib/gospel";
import { siteConfig } from "@/lib/site";

const GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pillars", href: "#pillars" },
      { label: "Download", href: "#waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "IshVerse", href: "https://ishverse.com" },
      { label: "Contact", href: `mailto:${siteConfig.contactEmail}` },
      { label: "Support", href: `mailto:${siteConfig.supportEmail}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "https://ishverse.com/privacy" },
      { label: "Terms", href: "https://ishverse.com/terms" },
    ],
  },
] as const;

export function GospelSiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 md:grid-cols-4">
        <div>
          <GospelLogo />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-fg-secondary">
            {gospelConfig.tagline} {gospelConfig.ecosystem}.
          </p>
        </div>
        {GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-[13px] font-medium text-fg">{g.title}</p>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-divider">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[12px] text-fg-secondary sm:px-8">
          © {new Date().getFullYear()} IshVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
