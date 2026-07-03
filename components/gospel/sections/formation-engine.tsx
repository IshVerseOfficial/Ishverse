/**
 * Module: GospelFormationEngine
 * Context: Ported from ishgospel-web — "This is a formation engine", voice
 * "System > Sentiment" (ishgospel-docs/BRAND.md).
 *
 * The core differentiator section: contrasts IshGospel with the apps it is not.
 * Split layout — statement left, "not this / but this" contrasts right; stacks
 * on mobile.
 *
 * Exports:
 *   GospelFormationEngine — server component
 */

import { Check, X } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const CONTRASTS = [
  { not: "A content feed to scroll", but: "A daily system to practice" },
  { not: "Points, badges, leaderboards", but: "A reflective score that measures depth" },
  { not: "Motivation that fades", but: "Discipline that compounds" },
] as const;

export function GospelFormationEngine() {
  return (
    <Section className="py-16 sm:py-24">
      <div className="grid items-center gap-12 rounded-3xl border border-divider bg-surface p-8 sm:p-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
            The difference
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
            This isn&rsquo;t a Bible app. It&rsquo;s a formation engine.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-secondary">
            Faith doesn&rsquo;t grow by accident — it&rsquo;s formed, one disciplined day at a time.
            IshGospel gives you the structure that turns intention into formation. No noise. No
            gimmicks.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <ul className="space-y-3">
            {CONTRASTS.map((c) => (
              <li key={c.but} className="rounded-2xl border border-divider bg-bg p-4">
                <p className="flex items-center gap-2 text-[13px] text-fg-secondary line-through decoration-fg-secondary/40">
                  <X className="h-4 w-4 shrink-0 text-error" aria-hidden />
                  {c.not}
                </p>
                <p className="mt-2 flex items-center gap-2 text-[14px] font-medium text-fg">
                  <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
                  {c.but}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
