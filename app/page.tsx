/**
 * Module: Home (Phase 0 shell)
 * Context: See DESIGN.md §10 — page blueprint; implementation_plan.md Phase 0.
 *
 * The landing shell: header, hero (NeuralField background — the VerseGlobe
 * replaces it in Phase 1), a simple product strip, contact band, footer.
 * Phase 1 rebuilds these as full composable sections.
 *
 * Exports:
 *   default — Home page (server component)
 */

import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NeuralField } from "@/components/neural-field";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero — VerseGlobe lands here in Phase 1 */}
        <div className="relative overflow-hidden">
          <NeuralField />
          <Section className="relative flex min-h-[80svh] flex-col justify-center py-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
              {siteConfig.name}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
              Systems for Intentional Growth.
            </h1>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-fg-secondary md:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.products[0].href}
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[14px] font-medium text-accent-on transition-colors hover:bg-accent-dark"
              >
                Explore IshGospel
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <span className="inline-flex items-center gap-2 rounded-[10px] border border-divider bg-glass-bg px-5 py-3 text-[14px] text-fg-secondary">
                IshRize <span className="text-gold">· coming soon</span>
              </span>
            </div>
          </Section>
        </div>

        {/* Products */}
        <Section id="products" className="py-24">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
            Products
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold md:text-3xl">
            One system per domain of life.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {siteConfig.products.map((p) => (
              <article
                key={p.name}
                className="rounded-2xl border border-divider bg-surface p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    {p.wordmark.strong}
                    <span className="font-normal text-fg-secondary">{p.wordmark.light}</span>
                  </h3>
                  {p.status === "live" ? (
                    <span className="rounded-full border border-divider px-3 py-1 text-[12px] text-fg-secondary">
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full border border-divider px-3 py-1 text-[12px] text-gold">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[13px] font-medium text-fg-secondary">{p.domain}</p>
                <p className="mt-4 text-base leading-relaxed text-fg-secondary">{p.oneLiner}</p>
                {p.status === "live" && (
                  <a
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent-dark"
                  >
                    Visit {p.name}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </article>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" className="pb-24">
          <div className="rounded-2xl border border-divider bg-glass-bg p-8 text-center backdrop-blur md:p-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Talk to us.</h2>
            <p className="mt-3 text-base text-fg-secondary">
              Partnerships, press, or questions — one address.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-fg px-5 py-3 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
