/**
 * Module: Robots
 * Context: SEO — robots.txt for search engine crawlers.
 *
 * Exports:
 *   default — robots config
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/api/"],
      },
    ],
    sitemap: ["https://ishverse.com/sitemap.xml", "https://rize.ishverse.com/sitemap.xml"],
  };
}
