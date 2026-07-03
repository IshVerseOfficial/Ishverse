/**
 * Module: GospelThemeShowcase
 * Context: "pure black ↔ pure white, no intermediate" (ishgospel-docs/BRAND.md).
 *
 * Shows both themes at once using the real Home screenshots from the app —
 * both are always visible regardless of the active site theme, which is the
 * point: this is a physical scene, not a themed surface.
 *
 * Exports:
 *   GospelThemeShowcase — server component
 */

import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { PhoneFrame } from "../phone-frame";

export function GospelThemeShowcase() {
  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold">
            Designed to disappear
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Pure black. Pure white.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
            Two themes, no distractions. It follows your system automatically — or switch it
            yourself, any time.
          </p>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-12 flex flex-wrap items-start justify-center gap-8 sm:gap-14">
          <figure className="text-center">
            <PhoneFrame src="/gospel/home-light.png" alt="IshGospel in the pure white theme" />
            <figcaption className="mt-4 text-[13px] text-fg-secondary">Pure white</figcaption>
          </figure>
          <figure className="text-center">
            <PhoneFrame src="/gospel/home-dark.png" alt="IshGospel in the pure black theme" />
            <figcaption className="mt-4 text-[13px] text-fg-secondary">Pure black</figcaption>
          </figure>
        </div>
      </Reveal>
    </Section>
  );
}
