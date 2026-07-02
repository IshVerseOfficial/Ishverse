/**
 * Module: GospelFinalCta
 * Context: Ported from ishgospel-web — primary goal is mobile installs;
 * waitlist captures the not-ready.
 *
 * Closing conversion block: download buttons (primary path) + the waitlist form
 * (secondary). The #waitlist id is the hero's secondary-CTA anchor target.
 *
 * Exports:
 *   GospelFinalCta — server component
 */

import { Apple, Play } from "lucide-react";
import { Section } from "../../ui/section";
import { WaitlistForm } from "../waitlist-form";
import { gospelConfig } from "@/lib/gospel";

export function GospelFinalCta() {
  const stores = [
    {
      href: gospelConfig.store.appStore,
      icon: Apple,
      top: "Download on the",
      bottom: "App Store",
    },
    { href: gospelConfig.store.playStore, icon: Play, top: "Get it on", bottom: "Google Play" },
  ];

  return (
    <Section id="waitlist" className="py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-divider bg-surface px-6 py-14 text-center sm:px-12">
        <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          Faith doesn&rsquo;t grow by accident.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-fg-secondary">
          Start forming — one disciplined day at a time. Get the app, or join the waitlist and
          we&rsquo;ll tell you the moment it&rsquo;s live in your store.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {stores.map((s) => (
            <a
              key={s.bottom}
              href={s.href}
              className="inline-flex items-center gap-3 rounded-[12px] border border-divider bg-bg px-5 py-3 text-left transition-colors hover:border-fg/20"
            >
              <s.icon className="h-6 w-6 text-fg" aria-hidden />
              <span>
                <span className="block text-[11px] leading-none text-fg-secondary">{s.top}</span>
                <span className="mt-0.5 block text-[15px] font-medium leading-tight text-fg">
                  {s.bottom}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-md border-t border-divider pt-8">
          <p className="mb-4 text-[13px] text-fg-secondary">Not ready? Join the waitlist.</p>
          <WaitlistForm />
        </div>
      </div>
    </Section>
  );
}
