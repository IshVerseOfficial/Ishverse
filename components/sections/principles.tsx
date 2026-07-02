/**
 * Module: Principles
 * Context: See DESIGN.md §8 + §10 — three principles, 3-up grid.
 *
 * Exports:
 *   Principles — server component
 */

import { Anchor, Grid3x3, Repeat } from "lucide-react";
import { Section } from "../ui/section";
import { Reveal } from "../reveal";

const PRINCIPLES = [
  {
    icon: Anchor,
    title: "Discipline over feeling",
    body: "Feelings follow action. Systems make action repeatable.",
  },
  {
    icon: Grid3x3,
    title: "Structure supports growth",
    body: "Growth that lasts is scaffolded, not spontaneous.",
  },
  {
    icon: Repeat,
    title: "Consistency builds depth",
    body: "Show up. Reflect. Grow. Then do it again tomorrow.",
  },
] as const;

export function Principles() {
  return (
    <Section id="principles" className="py-24 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
          Principles
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold md:text-5xl">
          What every Ish system believes.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <div className="h-full rounded-2xl border border-divider bg-glass-bg p-6 backdrop-blur md:p-8">
              <p.icon className="h-5 w-5 text-fg-secondary" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-fg-secondary">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
