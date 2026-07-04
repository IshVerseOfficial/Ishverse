/**
 * Module: IshGospel Landing Page
 * Context: See middleware.ts — served at gospel.ishverse.com via subdomain
 * rewrite. Localized (Phase 4).
 *
 * Exports:
 *   generateMetadata — localized SEO metadata (canonical on the gospel subdomain)
 *   default          — GospelHome
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GospelSiteHeader } from "@/components/gospel/site-header";
import { GospelSiteFooter } from "@/components/gospel/site-footer";
import { GospelHero } from "@/components/gospel/sections/hero";
import { GospelPillars } from "@/components/gospel/sections/pillars";
import { GospelShowcase } from "@/components/gospel/sections/showcase";
import { GospelFormationEngine } from "@/components/gospel/sections/formation-engine";
import { GospelHowItWorks } from "@/components/gospel/sections/how-it-works";
import { GospelBreakingHabits } from "@/components/gospel/sections/breaking-habits";
import { GospelThemeShowcase } from "@/components/gospel/sections/theme-showcase";
import { GospelTestimonial } from "@/components/gospel/sections/testimonial";
import { GospelPricing } from "@/components/gospel/sections/pricing";
import { GospelFaq } from "@/components/gospel/sections/faq";
import { GospelFinalCta } from "@/components/gospel/sections/final-cta";
import { gospelConfig } from "@/lib/gospel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gospel.meta" });
  const title = `${gospelConfig.name} — ${t("tagline")}`;

  return {
    title,
    description: t("description"),
    alternates: { canonical: gospelConfig.url },
    openGraph: {
      type: "website",
      title,
      description: t("description"),
      url: gospelConfig.url,
      siteName: gospelConfig.name,
      locale,
    },
    twitter: { card: "summary_large_image", title, description: t("description") },
  };
}

export default async function GospelHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <GospelSiteHeader />
      <main>
        <GospelHero />
        <GospelPillars />
        <GospelShowcase />
        <GospelFormationEngine />
        <GospelHowItWorks />
        <GospelBreakingHabits />
        <GospelThemeShowcase />
        <GospelTestimonial />
        <GospelPricing />
        <GospelFaq />
        <GospelFinalCta />
      </main>
      <GospelSiteFooter />
    </>
  );
}
