/**
 * Module: RizeChangelog
 * Context: See IshRize-Master-Build-Specification Stage 16 — release notes
 * page. Static content managed as a data array; no CMS needed at this scale.
 *
 * Exports:
 *   generateMetadata — localized SEO metadata
 *   default          — RizeChangelogPage
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RizeSiteHeader } from "@/components/rize/site-header";
import { RizeSiteFooter } from "@/components/rize/site-footer";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { rizeConfig } from "@/lib/rize";

interface Release {
  version: string;
  date: string;
  title: string;
  changes: { type: "added" | "improved" | "fixed"; text: string }[];
}

const RELEASES: Release[] = [
  {
    version: "0.15.0",
    date: "2026-08-21",
    title: "Bridge to Attendance",
    changes: [
      { type: "added", text: "Auto-session generation from timetable bookings." },
      { type: "added", text: "Today's Sessions dashboard for lecturers." },
      { type: "added", text: "Missed sessions with timetable context for students." },
      { type: "added", text: "Attendance stats overlay on the schedule grid." },
    ],
  },
  {
    version: "0.14.0",
    date: "2026-08-14",
    title: "Multi-Tenant Hardening",
    changes: [
      { type: "added", text: "Tenant isolation middleware on all org-scoped routes." },
      { type: "added", text: "Per-org rate limiting." },
      { type: "added", text: "Per-org GDPR data export." },
    ],
  },
  {
    version: "0.13.0",
    date: "2026-08-07",
    title: "Notifications",
    changes: [
      { type: "added", text: "In-app notification system with bell dropdown." },
      { type: "added", text: "Notification preferences per user." },
      { type: "added", text: "Real-time notification delivery." },
    ],
  },
  {
    version: "0.12.0",
    date: "2026-07-31",
    title: "Host Dashboard and Booking Requests",
    changes: [
      { type: "added", text: "Host dashboard with teaching load stats." },
      { type: "added", text: "Booking request workflow for extra sessions." },
      { type: "added", text: "Free slot finder for coordinators." },
    ],
  },
  {
    version: "0.11.0",
    date: "2026-07-24",
    title: "Observability and Performance",
    changes: [
      { type: "added", text: "Sentry error tracking on backend and frontend." },
      { type: "improved", text: "Structured logging with request duration." },
      { type: "improved", text: "Database connection pool tuning." },
      { type: "added", text: "WebSocket fallback for real-time schedule updates." },
    ],
  },
  {
    version: "0.10.0",
    date: "2026-07-17",
    title: "Web Dashboard",
    changes: [
      {
        type: "added",
        text: "Full web dashboard: overview, people, venues, activities, groups, calendar, structure.",
      },
      { type: "added", text: "Account management pages: profile, sessions, security." },
      { type: "added", text: "Organization settings with danger zone." },
      { type: "added", text: "Audit log viewer." },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-07-10",
    title: "Scheduling Intelligence",
    changes: [
      { type: "added", text: "Constraint-aware scheduling engine with backtracking solver." },
      { type: "added", text: "Clash detection and resolution." },
      { type: "added", text: "Master timetable grid with drag-and-drop." },
      { type: "added", text: "Calendar, terms, and time slot management." },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-07-03",
    title: "Multi-Layer Attendance",
    changes: [
      { type: "added", text: "Rotating QR code attendance with HMAC verification." },
      { type: "added", text: "BLE proximity detection." },
      { type: "added", text: "Wi-Fi BSSID matching." },
      { type: "added", text: "Confidence scoring and anomaly detection." },
      {
        type: "added",
        text: "Student self-growth insights: consistency, trends, reflections, goals.",
      },
    ],
  },
];

const TYPE_STYLES: Record<
  Release["changes"][number]["type"],
  { label: string; className: string }
> = {
  added: { label: "Added", className: "bg-accent/10 text-accent-text" },
  improved: { label: "Improved", className: "bg-gold/10 text-gold-text" },
  fixed: { label: "Fixed", className: "bg-surface text-fg-secondary" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rize.changelog" });

  return {
    title: `${t("eyebrow")} — ${rizeConfig.name}`,
    description: t("sub"),
    alternates: { canonical: `${rizeConfig.url}/changelog` },
    icons: { icon: "/ishrize-logo.png" },
    openGraph: {
      type: "website",
      title: `${t("eyebrow")} — ${rizeConfig.name}`,
      description: t("sub"),
      url: `${rizeConfig.url}/changelog`,
      siteName: rizeConfig.name,
      locale,
      images: [{ url: "/api/og/rize", width: 1200, height: 630 }],
    },
  };
}

export default async function RizeChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "rize.changelog" });

  return (
    <>
      <RizeSiteHeader />
      <main>
        <Section className="py-16 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                {t("heading")}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("sub")}</p>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-2xl">
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-divider" aria-hidden />
            <div className="space-y-12">
              {RELEASES.map((release, i) => (
                <Reveal key={release.version} delay={i * 40}>
                  <div className="relative pl-8">
                    <div
                      className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg"
                      aria-hidden
                    />
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h2 className="text-lg font-semibold text-fg">{release.title}</h2>
                      <span className="rounded-full bg-surface px-2.5 py-0.5 text-[12px] font-medium text-fg-secondary">
                        v{release.version}
                      </span>
                      <time className="text-[13px] text-fg-secondary">{release.date}</time>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {release.changes.map((change, j) => {
                        const style = TYPE_STYLES[change.type];
                        return (
                          <li key={j} className="flex items-start gap-2.5 text-[14px] text-fg">
                            <span
                              className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold ${style.className}`}
                            >
                              {style.label}
                            </span>
                            {change.text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <RizeSiteFooter />
    </>
  );
}
