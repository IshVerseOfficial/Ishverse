/**
 * Module: GospelLogo
 * Context: The real IshGospel brand mark, copied from the mobile app
 * (ishgospel-frontend/assets/icon.png) — blue + gold rising bars with roots,
 * transparent background so it reads on both pure black and pure white.
 *
 * Exports:
 *   GospelLogo — the IshGospel mark + wordmark; size via `className`
 */

import Image from "next/image";
import { gospelConfig } from "@/lib/gospel";

export function GospelLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/ishgospel-logo.png"
        alt=""
        width={36}
        height={28}
        priority
        className="h-[28px] w-[36px] object-contain"
      />
      <span className="text-[16px] font-bold tracking-[0.2px] text-fg">
        {gospelConfig.wordmark.strong}
        <span className="font-normal text-fg-secondary">{gospelConfig.wordmark.light}</span>
      </span>
    </span>
  );
}
