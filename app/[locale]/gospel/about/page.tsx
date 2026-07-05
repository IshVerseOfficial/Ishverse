/**
 * Module: IshGospel About Page
 * Context: See middleware.ts — served at gospel.ishverse.com/about.
 *
 * What IshGospel is, why it exists, and how to reach us.
 *
 * Exports:
 *   metadata — page SEO metadata
 *   default  — GospelAboutPage
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GospelLegalPage, H2, H3, P, UL } from "@/components/gospel/legal-prose";
import { gospelConfig } from "@/lib/gospel";

export const metadata: Metadata = {
  title: "About — IshGospel",
  description:
    "IshGospel is a structured spiritual formation app — Bible, prayer, community, and vision. Not a content feed.",
  alternates: { canonical: `${gospelConfig.url}/about` },
};

const SUPPORT = "support@ishverse.com";

export default async function GospelAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <GospelLegalPage title="About IshGospel" updated="">
      <P>
        IshGospel is a structured spiritual formation system built for people who want to grow
        intentionally in their faith — not just consume content.
      </P>
      <P>
        Most Bible apps are content feeds. IshGospel is a discipline system: it helps you build
        consistent reading habits, pray with structure, stay accountable through community, and
        track the long arc of your spiritual growth.
      </P>

      <H2 id="what-we-build">What we build</H2>

      <H3>Bible reader</H3>
      <P>
        A clean, focused Bible reading experience with multiple translations, highlights, notes, and
        cross-references. The reading plan system tracks your progress and builds reading streaks
        over time.
      </P>

      <H3>Prayer and formation</H3>
      <P>
        Structured prayer logs, formation habits, and a daily Verse of the Day — chosen to ground
        each day before it starts.
      </P>

      <H3>Community</H3>
      <P>
        Join or lead a church or small group. Share prayer requests, track group Bible plans, and
        hold each other accountable. Church leaders get tools to manage their community and see who
        is engaged.
      </P>

      <H3>Vision</H3>
      <P>
        Set goals, track streaks, and build the kind of long-term discipline that produces depth —
        not just information.
      </P>

      <H2 id="who-built-it">Who built IshGospel</H2>
      <P>
        IshGospel is built by IshVerse — a small team building discipline systems for intentional
        growth, one domain of life at a time. IshGospel is the faith domain.
      </P>

      <H2 id="mission">The mission</H2>
      <P>
        Discipline builds depth. We believe consistent spiritual practice — not occasional bursts of
        inspiration — is what produces real growth. IshGospel is designed to make that practice
        sustainable, measurable, and communal.
      </P>

      <H2 id="contact">Contact</H2>
      <UL>
        <li>
          Support:{" "}
          <a href={`mailto:${SUPPORT}`} className="text-accent">
            {SUPPORT}
          </a>
        </li>
        <li>
          Website:{" "}
          <a href={gospelConfig.url} className="text-accent">
            {gospelConfig.url}
          </a>
        </li>
        <li>
          Privacy policy:{" "}
          <a href={`${gospelConfig.url}/privacy`} className="text-accent">
            gospel.ishverse.com/privacy
          </a>
        </li>
      </UL>
    </GospelLegalPage>
  );
}
