/**
 * Module: RizeLogo
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — the established
 * wordmark pattern. Uses the raster mark asset from the mobile app.
 *
 * Exports:
 *   RizeLogo — the IshRize logo mark + wordmark; size via `className`
 */

import Image from "next/image";
import { rizeConfig } from "@/lib/rize";

export function RizeLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image src="/ishrize-logo.png" alt={rizeConfig.name} width={28} height={28} />
      <span className="text-[16px] font-bold tracking-[0.2px] text-fg">
        {rizeConfig.wordmark.strong}
        <span className="font-light text-fg-secondary">{rizeConfig.wordmark.light}</span>
      </span>
    </span>
  );
}
