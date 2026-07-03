/**
 * Module: IshGospel Landing Page
 * Context: See middleware.ts — served at gospel.ishverse.com via subdomain
 * rewrite. Ported from the retired ishgospel-web repo (its Phase 1 landing).
 *
 * The conversion-focused product page, composed from gospel section components.
 * Server-rendered; client islands are the theme toggle, NeuralField, and
 * waitlist form.
 *
 * Exports:
 *   metadata — page SEO metadata (canonical on the gospel subdomain)
 *   default  — GospelHome
 */

import type { Metadata } from "next";
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
import { GospelFinalCta } from "@/components/gospel/sections/final-cta";
import { gospelConfig } from "@/lib/gospel";

const title = `${gospelConfig.name} — ${gospelConfig.tagline}`;

export const metadata: Metadata = {
  title,
  description: gospelConfig.description,
  alternates: { canonical: gospelConfig.url },
  openGraph: {
    type: "website",
    title,
    description: gospelConfig.description,
    url: gospelConfig.url,
    siteName: gospelConfig.name,
  },
  twitter: { card: "summary_large_image", title, description: gospelConfig.description },
};

export default function GospelHome() {
  return (
    <>
      <GospelSiteHeader />
      <main>
        <GospelHero />
        <GospelPillars />
        <GospelFormationEngine />
        <GospelShowcase />
        <GospelHowItWorks />
        <GospelBreakingHabits />
        <GospelThemeShowcase />
        <GospelTestimonial />
        <GospelFinalCta />
      </main>
      <GospelSiteFooter />
    </>
  );
}
