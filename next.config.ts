import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Proxy rize.ishverse.com/app/* → ish-rize-web Vercel deployment.
      // Runs before Next.js route resolution so /app/* never hits internal pages.
      beforeFiles: [
        {
          source: "/app/:path*",
          has: [{ type: "host", value: "rize.ishverse.com" }],
          destination: "https://ish-rize-web.vercel.app/app/:path*",
        },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
