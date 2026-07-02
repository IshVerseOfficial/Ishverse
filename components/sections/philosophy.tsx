/**
 * Module: Philosophy
 * Context: See DESIGN.md §2 + §10 — the story band. "Dark is the stage":
 * this section is force-scoped `.dark` so it reads as points of light in
 * darkness in both themes (the `.dark` class re-themes all CSS variables
 * inside it — same mechanism next-themes uses on <html>).
 *
 * Exports:
 *   Philosophy — server component (NeuralField is a client canvas island)
 */

import { Section } from "../ui/section";
import { NeuralField } from "../neural-field";
import { Reveal } from "../reveal";

export function Philosophy() {
  return (
    <div id="story" className="dark relative overflow-hidden bg-bg text-fg">
      <NeuralField />
      <Section className="relative py-24 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
            The name
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">
            Ish is man. Verse is his world.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-fg-secondary md:text-lg">
            <p>
              <span className="font-semibold text-fg">Ish</span> — the Hebrew word for man. Spirit,
              will, the capacity to act.
            </p>
            <p>
              <span className="font-semibold text-fg">Verse</span> — the world he is given: faith,
              learning, work, habit.
            </p>
            <p>
              Every Ish product takes one domain of that world and gives it structure. Not
              motivation — systems. The world turns; the disciplined man is still, and in command of
              it.
            </p>
            <p className="text-fg">
              The system is <span className="text-accent">blue</span>. The man is{" "}
              <span className="text-gold">gold</span>.
            </p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
