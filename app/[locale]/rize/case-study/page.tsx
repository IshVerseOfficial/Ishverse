/**
 * Module: RizeCaseStudy
 * Context: See IshRize-Master-Build-Specification Stage 16 — social proof
 * from the University of Ghana Mathematics Department pilot. Localized.
 *
 * Exports:
 *   generateMetadata — localized SEO metadata
 *   default          — RizeCaseStudyPage
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RizeSiteHeader } from "@/components/rize/site-header";
import { RizeSiteFooter } from "@/components/rize/site-footer";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { rizeConfig } from "@/lib/rize";
import { CalendarX2, TrendingUp, Clock, BarChart3 } from "lucide-react";

const RESULTS = [
  { key: "result1", icon: CalendarX2 },
  { key: "result2", icon: TrendingUp },
  { key: "result3", icon: Clock },
  { key: "result4", icon: BarChart3 },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rize.caseStudy" });

  return {
    title: `${t("eyebrow")} — ${rizeConfig.name}`,
    description: t("sub"),
    alternates: { canonical: `${rizeConfig.url}/case-study` },
    icons: { icon: "/ishrize-logo.png" },
    openGraph: {
      type: "article",
      title: t("heading"),
      description: t("sub"),
      url: `${rizeConfig.url}/case-study`,
      siteName: rizeConfig.name,
      locale,
      images: [{ url: "/api/og/rize", width: 1200, height: 630 }],
    },
  };
}

export default async function RizeCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rize.caseStudy" });

  return (
    <>
      <RizeSiteHeader />
      <main>
        {/* Hero */}
        <Section className="py-16 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                {t("heading")}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("sub")}</p>
            </div>
          </Reveal>
        </Section>

        {/* Challenge + Solution */}
        <Section className="pb-16 sm:pb-24">
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
            <Reveal>
              <div className="rounded-3xl border border-divider bg-surface p-6 sm:p-8">
                <p className="text-[13px] font-medium uppercase tracking-wide text-error">
                  {t("challengeHeading")}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
                  {t("challengeBody")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="rounded-3xl border border-divider bg-surface p-6 sm:p-8">
                <p className="text-[13px] font-medium uppercase tracking-wide text-success">
                  {t("solutionHeading")}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
                  {t("solutionBody")}
                </p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Results */}
        <Section className="pb-16 sm:pb-24">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              {t("resultHeading")}
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {RESULTS.map(({ key, icon: Icon }, i) => (
              <Reveal key={key} delay={i * 60}>
                <div className="flex gap-4 rounded-2xl border border-divider bg-surface p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-fg">{t(`${key}Title`)}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-fg-secondary">
                      {t(`${key}Desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Quote */}
        <Section className="pb-16 sm:pb-24">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-accent/25 bg-accent/[0.04] p-8 sm:p-12">
              <blockquote className="text-center">
                <p className="text-lg font-medium italic leading-relaxed text-fg sm:text-xl">
                  &ldquo;{t("quoteBody")}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-[14px] font-semibold text-fg">{t("quoteAuthor")}</p>
                  <p className="mt-0.5 text-[13px] text-fg-secondary">{t("quoteOrg")}</p>
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </Section>
      </main>
      <RizeSiteFooter />
    </>
  );
}
