/**
 * Module: RizeLogo
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — the established
 * wordmark pattern (bold ISH + light RIZE). Text-only for now: unlike gospel,
 * IshRize has no raster mark asset in this repo yet.
 *
 * Exports:
 *   RizeLogo — the IshRize wordmark; size via `className`
 */

import { rizeConfig } from "@/lib/rize";

export function RizeLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-[16px] font-bold tracking-[0.2px] text-fg">
        {rizeConfig.wordmark.strong}
        <span className="font-light text-fg-secondary">{rizeConfig.wordmark.light}</span>
      </span>
    </span>
  );
}
