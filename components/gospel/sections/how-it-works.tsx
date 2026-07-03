/**
 * Module: GospelHowItWorks
 * Context: Ported from ishgospel-web — voice "Show up. Reflect. Grow."
 *
 * Three-step explainer of the daily loop. Numbered cards, responsive 1→3 cols.
 *
 * Exports:
 *   GospelHowItWorks — server component
 */

import { CalendarCheck, PenLine, Sprout } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Show up",
    desc: "Open the app to read, pray, or sit with scripture. A small, repeatable daily block.",
  },
  {
    icon: PenLine,
    title: "Reflect",
    desc: "Journal what you noticed. Mark the day. Honesty over performance — every time.",
  },
  {
    icon: Sprout,
    title: "Grow",
    desc: "Consistency compounds. Your formation deepens, your streak holds, your community sees it.",
  },
] as const;

export function GospelHowItWorks() {
  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Show up. Reflect. Grow.
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-2xl font-bold text-divider">{i + 1}</span>
              </div>
              <p className="mt-4 text-[16px] font-medium text-fg">{s.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-secondary">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
