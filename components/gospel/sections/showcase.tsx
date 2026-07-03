/**
 * Module: GospelShowcase
 * Context: See implementation_plan.md — "Inside the app": real screenshots
 * paired with the features they prove, in alternating split rows.
 *
 * Exports:
 *   GospelShowcase — server component (Reveal is a client island)
 */

import { Check } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { PhoneFrame } from "../phone-frame";

const ROWS = [
  {
    eyebrow: "Bible",
    title: "Scripture, beautifully readable.",
    body: "A reader that gets out of the way. Multiple versions, chapter audio, offline downloads — and parallel versions side by side when you want to go deeper.",
    points: ["Listen with chapter audio", "Read offline, anywhere", "Highlights, notes, and plans"],
    img: "/gospel/bible.png",
    alt: "The IshGospel Bible reader showing Psalms 119",
  },
  {
    eyebrow: "Prayer & Journal",
    title: "Reflection that sticks.",
    body: "Log prayers, journal what you noticed, and let honesty compound into depth. Your journals and prayers stay private to your account — always.",
    points: ["Guided daily reflection", "Prayer log with answers", "Private by default"],
    img: "/gospel/journal.png",
    alt: "The IshGospel journaling screen",
  },
  {
    eyebrow: "Vision & Formation",
    title: "Goals with a spine.",
    body: "Set spiritual goals, watch your formation score, and let the quiet numbers tell you the truth about your walk. No badges. No noise.",
    points: [
      "Formation score out of 100",
      "Streaks that measure showing up",
      "Spiritual goals, tracked",
    ],
    img: "/gospel/vision.png",
    alt: "The IshGospel vision and goals screen",
  },
] as const;

export function GospelShowcase() {
  return (
    <Section id="showcase" className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            Inside the app
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Built for the daily work.
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 space-y-20 sm:space-y-28">
        {ROWS.map((row, i) => (
          <div key={row.eyebrow} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
                {row.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl">
                {row.title}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-secondary">
                {row.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {row.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[14px] text-fg">
                    <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={60} className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <PhoneFrame src={row.img} alt={row.alt} />
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
