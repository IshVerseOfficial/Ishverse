import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Proxy rize.ishverse.com/app/* → ish-rize-web Vercel deployment.
      // Runs before Next.js route resolution so /app/* never hits internal pages.
      beforeFiles: [
        // /app (exact, no trailing path) — Next.js /:path* requires a separator,
        // so the exact path needs its own entry to avoid falling through to Ishverse routing.
        {
          source: "/app",
          has: [{ type: "host", value: "rize.ishverse.com" }],
          destination: "https://ish-rize-web.vercel.app/app",
        },
        {
          source: "/app/:path*",
          has: [{ type: "host", value: "rize.ishverse.com" }],
          destination: "https://ish-rize-web.vercel.app/app/:path*",
        },
        // Browser-side fetch calls use /api/* (no /app prefix) — proxy those too.
        {
          source: "/api/:path*",
          has: [{ type: "host", value: "rize.ishverse.com" }],
          destination: "https://ish-rize-web.vercel.app/app/api/:path*",
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
