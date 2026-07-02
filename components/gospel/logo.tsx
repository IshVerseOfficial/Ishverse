/**
 * Module: GospelLogo
 * Context: Ported from ishgospel-web — "ISH" bold + "GOSPEL" light, abstract
 * rising-bars mark (no crosses / religious imagery) per ishgospel-docs/BRAND.md.
 *
 * Exports:
 *   GospelLogo — the IshGospel wordmark; size via `className`
 */

import { gospelConfig } from "@/lib/gospel";

export function GospelLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-accent">
        <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true">
          <rect x="1" y="6" width="2.4" height="5" rx="0.6" fill="#fff" />
          <rect x="4.8" y="3" width="2.4" height="8" rx="0.6" fill="#fff" />
          <rect x="8.6" y="0.5" width="2.4" height="10.5" rx="0.6" fill="#fff" />
        </svg>
      </span>
      <span className="text-[16px] font-bold tracking-[0.2px] text-fg">
        {gospelConfig.wordmark.strong}
        <span className="font-normal text-fg-secondary">{gospelConfig.wordmark.light}</span>
      </span>
    </span>
  );
}
