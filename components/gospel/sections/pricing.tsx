/**
 * Module: GospelPricing
 * Context: See implementation_plan.md Phase 7 — pricing that mirrors the
 * mobile app's paywall (SubscriptionPlansScreen): Personal $4.99, Family
 * $9.99, Church Lite $49, Church Pro $199 per month. Keep the two in sync —
 * if the app paywall changes, change this.
 *
 * Individuals get a 3-card row (Free · Personal highlighted · Family);
 * churches get a separate 2-card band. Subscriptions are purchased in the
 * app, so individual CTAs funnel to download; church CTAs go to contact.
 *
 * Exports:
 *   GospelPricing — server component
 */

import { Check } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { siteConfig } from "@/lib/site";

const INDIVIDUAL_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "The daily work, free for everyone",
    features: [
      "Bible reading, highlights & plans",
      "Journaling & prayer log",
      "Formation score & streaks",
      "Join a community",
    ],
    cta: "Get the app",
    href: "#waitlist",
    highlighted: false,
  },
  {
    name: "Personal Premium",
    price: "$4.99",
    period: "per month",
    description: "Perfect for individuals",
    features: [
      "Unlimited communities",
      "Formation tracking",
      "Shared reading plans",
      "Ad-free experience",
    ],
    cta: "Get the app",
    href: "#waitlist",
    highlighted: true,
  },
  {
    name: "Family Plan",
    price: "$9.99",
    period: "per month",
    description: "For families (5–10 people)",
    features: [
      "Everything in Personal",
      "Up to 10 family members",
      "Family dashboard",
      "Shared reading plans",
    ],
    cta: "Get the app",
    href: "#waitlist",
    highlighted: false,
  },
] as const;

const CHURCH_PLANS = [
  {
    name: "Church Lite",
    price: "$49",
    period: "per month",
    description: "Small groups (15–50 members)",
    features: [
      "Admin dashboard",
      "Group leader tools",
      "Track member progress",
      "Export reports",
      "Email support",
    ],
  },
  {
    name: "Church Pro",
    price: "$199",
    period: "per month",
    description: "Larger churches (100+ members)",
    features: [
      "Everything in Lite",
      "White-label option",
      "API access",
      "Phone support",
      "Custom integrations",
    ],
  },
] as const;

export function GospelPricing() {
  return (
    <Section id="pricing" className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Start free. Grow when you&rsquo;re ready.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
            The daily work — Bible, journal, prayer, formation — is free. Premium unlocks more
            communities and tools for families and churches. Subscriptions are managed in the app.
          </p>
        </div>
      </Reveal>

      {/* Individuals */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {INDIVIDUAL_PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 60} className="h-full">
            <div
              className={`flex h-full flex-col rounded-3xl p-6 sm:p-8 ${
                plan.highlighted
                  ? "border-2 border-accent bg-surface"
                  : "border border-divider bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold text-fg">{plan.name}</p>
                {plan.highlighted && (
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-on">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-[13px] text-fg-secondary">{plan.description}</p>
              <p className="mt-5">
                <span className="text-4xl font-bold tracking-tight text-fg">{plan.price}</span>
                <span className="ml-1.5 text-[13px] text-fg-secondary">{plan.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-fg">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`mt-8 inline-flex items-center justify-center rounded-[10px] px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? "bg-accent text-accent-on"
                    : "border border-divider bg-bg text-fg"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Churches */}
      <Reveal delay={120}>
        <div className="mt-12 rounded-3xl border border-accent/25 bg-accent/[0.06] p-6 sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
              For churches
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              Lead a whole community through formation.
            </h3>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {CHURCH_PLANS.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col rounded-2xl border border-divider bg-bg p-6"
              >
                <p className="text-[15px] font-semibold text-fg">{plan.name}</p>
                <p className="mt-1 text-[13px] text-fg-secondary">{plan.description}</p>
                <p className="mt-4">
                  <span className="text-3xl font-bold tracking-tight text-fg">{plan.price}</span>
                  <span className="ml-1.5 text-[13px] text-fg-secondary">{plan.period}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`${plan.name} — IshGospel`)}`}
                  className="mt-6 inline-flex items-center justify-center rounded-[10px] border border-divider bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-glass-bg"
                >
                  Talk to us
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
