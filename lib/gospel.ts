/**
 * Module: IshGospel Site Configuration
 * Context: Ported from the retired ishgospel-web repo — brand strings per
 * ishgospel-docs/BRAND.md. Serves the gospel.ishverse.com landing page.
 *
 * Exports:
 *   gospelConfig — name, wordmark, tagline, description, url, store links
 *   apiBaseUrl   — the shared ishgospel-backend API origin (waitlist)
 */

export const gospelConfig = {
  name: "IshGospel",
  wordmark: { strong: "ISH", light: "GOSPEL" },
  tagline: "Discipline builds depth.",
  description:
    "A structured spiritual formation system — Bible, prayer, community, and vision. Not a content feed. Show up. Reflect. Grow.",
  url: "https://gospel.ishverse.com",
  ecosystem: "Part of the Ish ecosystem",
  store: {
    appStore: "#",
    playStore: "#",
  },
} as const;

/**
 * Base URL of the shared ishgospel-backend API (Railway). Only used
 * server-side by the waitlist route handler. Override with
 * NEXT_PUBLIC_API_BASE_URL if the backend moves.
 */
export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://ishgospel-api-production.up.railway.app";
