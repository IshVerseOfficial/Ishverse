/**
 * Module: GospelTestimonial
 * Context: Ported from ishgospel-web — one strong, named testimonial.
 *
 * A single editorial quote. NOTE: placeholder attribution — swap for a real,
 * consented quote before promoting the page.
 *
 * Exports:
 *   GospelTestimonial — server component
 */

import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const QUOTE =
  "I've started a dozen Bible apps. This is the first one that felt like a system instead of a feed. Ninety days in, the discipline finally stuck.";
const NAME = "Daniel A.";
const ROLE = "Small group leader";

export function GospelTestimonial() {
  const initials = NAME.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-fg sm:text-3xl">
            &ldquo;{QUOTE}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-[13px] font-medium text-accent">
              {initials}
            </span>
            <span className="text-left">
              <span className="block text-[14px] font-medium text-fg">{NAME}</span>
              <span className="block text-[13px] text-fg-secondary">{ROLE}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
