/**
 * Module: Sitemap
 * Context: SEO — sitemap.xml covering company and product pages.
 *
 * Exports:
 *   default — sitemap entries
 */

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    { url: "https://ishverse.com", lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: "https://ishverse.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://ishverse.com/terms",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    { url: "https://rize.ishverse.com", lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: "https://rize.ishverse.com/pricing",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://rize.ishverse.com/changelog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://rize.ishverse.com/case-study",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
