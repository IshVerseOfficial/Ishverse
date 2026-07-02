/**
 * Module: Logo
 * Context: See DESIGN.md §8 — IshVerse wordmark: "ISH" bold + "VERSE" light.
 *
 * The mark is a mini constellation: three white nodes (the verse — the world's
 * domains) connected to one gold node (the man) on the accent-blue tile. Same
 * metaphor as every visualization on the site: the system is blue, the man is
 * gold (DESIGN.md §3).
 *
 * Exports:
 *   Logo — the wordmark with the constellation mark; size via `className`
 */

import { siteConfig } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-accent">
        <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
          <g stroke="rgba(255,255,255,0.65)" strokeWidth="0.7">
            <line x1="2.2" y1="8.8" x2="6" y2="2.6" />
            <line x1="6" y1="2.6" x2="9.8" y2="8.2" />
            <line x1="2.2" y1="8.8" x2="9.8" y2="8.2" />
            <line x1="2.2" y1="8.8" x2="6" y2="7" />
            <line x1="6" y1="2.6" x2="6" y2="7" />
            <line x1="9.8" y1="8.2" x2="6" y2="7" />
          </g>
          <circle cx="2.2" cy="8.8" r="1" fill="#fff" />
          <circle cx="6" cy="2.6" r="1" fill="#fff" />
          <circle cx="9.8" cy="8.2" r="1" fill="#fff" />
          <circle cx="6" cy="7" r="1.35" fill="#a68a4c" />
        </svg>
      </span>
      <span className="text-[16px] font-bold tracking-[0.2px] text-fg">
        {siteConfig.wordmark.strong}
        <span className="font-normal text-fg-secondary">{siteConfig.wordmark.light}</span>
      </span>
    </span>
  );
}
