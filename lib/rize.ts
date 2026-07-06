/**
 * Module: IshRize Site Configuration
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — brand strings for the
 * rize.ishverse.com landing page. Serves the same role as lib/gospel.ts.
 *
 * Exports:
 *   rizeConfig — name, wordmark, tagline, description, url, app links
 */

export const rizeConfig = {
  name: "IshRize",
  wordmark: { strong: "ISH", light: "RIZE" },
  tagline: "Disciplined growth through structure.",
  description:
    "A scheduling-intelligence and attendance platform for organizations. Import your timetables, run live clash detection, and track attendance — all in one system.",
  url: "https://rize.ishverse.com",
  ecosystem: "Part of the IshVerse ecosystem",
  contact: "contact@ishverse.com",
  app: {
    // The lecturer/admin dashboard — served from this same hostname (see the
    // /app multi-zone rewrite in next.config.ts once Phase 4 ships).
    web: "https://rize.ishverse.com/app",
    appStore: "#", // placeholder until iOS submission
    playStore: "#", // placeholder until Android submission
  },
} as const;
