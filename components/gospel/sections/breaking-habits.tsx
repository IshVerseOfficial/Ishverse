/**
 * Module: GospelBreakingHabits
 * Context: Ported from ishgospel-web — Breaking Habits feature
 * (ishgospel-docs/RETENTION_FEATURES.md).
 *
 * Spotlight for the addiction-breaking feature: a daily covenant anchored in
 * scripture, with real-time intervention and optional accountability. Split
 * layout — narrative left, feature points right; stacks on mobile.
 *
 * Exports:
 *   GospelBreakingHabits — server component
 */

import { BookMarked, HeartHandshake, Shield, ShieldBan } from "lucide-react";
import { Section } from "../../ui/section";

const POINTS = [
  {
    icon: BookMarked,
    title: "Anchor verse",
    desc: "Choose the scripture you return to in the moment of temptation.",
  },
  {
    icon: ShieldBan,
    title: "Real-time intervention",
    desc: "A pre-committed if-then replacement, the instant the urge hits.",
  },
  {
    icon: HeartHandshake,
    title: "Accountability partner",
    desc: "An optional ally who sees your streak and verse — never your details.",
  },
] as const;

export function GospelBreakingHabits() {
  return (
    <Section id="features" className="py-16 sm:py-24">
      <div className="grid items-center gap-12 rounded-3xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-[12px] font-medium text-accent-dark dark:text-accent">
            <Shield className="h-3.5 w-3.5" aria-hidden />
            Breaking Habits
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
            Scripture-anchored intervention at your hardest moment.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-secondary">
            Not a streak counter. A daily covenant — built on the verse you choose — that meets you
            the moment temptation hits, and a community that helps you rise again when you fall.
          </p>
        </div>

        <ul className="space-y-3">
          {POINTS.map((p) => (
            <li
              key={p.title}
              className="flex items-start gap-4 rounded-2xl border border-divider bg-bg p-4"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <p.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[14px] font-medium text-fg">{p.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
