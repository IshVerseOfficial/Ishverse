/**
 * Module: GospelPillars
 * Context: Ported from ishgospel-web — core pillars: Bible · Community ·
 * Formation · Vision (ishgospel-docs/README.md).
 *
 * The four product pillars as a responsive card grid (2-up on mobile, 4-up on
 * desktop). Blue accents for the "engage" pillars, gold for the "grow" pillars.
 *
 * Exports:
 *   GospelPillars — server component
 */

import { Activity, BookOpen, Target, Users } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const PILLARS = [
  {
    icon: BookOpen,
    accent: "accent",
    title: "Bible",
    desc: "Read, highlight, and follow plans — in your language, online or off.",
  },
  {
    icon: Users,
    accent: "accent",
    title: "Community",
    desc: "Shared scripture assignments and prayer with the people you grow with.",
  },
  {
    icon: Activity,
    accent: "gold",
    title: "Formation",
    desc: "Streaks, prayer, and reflection — a quiet score that measures depth, not points.",
  },
  {
    icon: Target,
    accent: "gold",
    title: "Vision",
    desc: "Set spiritual goals and break the habits that hold you back.",
  },
] as const;

export function GospelPillars() {
  return (
    <Section id="pillars" className="py-16 sm:py-24">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            Four pillars
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            One system for the whole of your formation.
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-5 transition-colors hover:border-fg/20">
              <p.icon
                className={p.accent === "gold" ? "h-5 w-5 text-gold" : "h-5 w-5 text-accent"}
                aria-hidden
              />
              <p className="mt-3 text-[15px] font-medium text-fg">{p.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
