/**
 * Module: Gospel Verse Deep-Link Page
 * Context: See middleware.ts — served at gospel.ishverse.com/verse/[date].
 *
 * Landing page for verses shared from the IshGospel app.
 * When the link is tapped on a device with the app installed, iOS/Android
 * universal links open IshGospel directly before this page is ever loaded.
 * Users who see this page either don't have the app yet (growth loop) or
 * arrived from a browser.
 *
 * The verse is computed deterministically from the date using the same
 * pool + day-of-year algorithm as the mobile app and backend, so no API
 * call is needed and the page renders at build time.
 *
 * Exports:
 *   generateMetadata — per-verse OG metadata
 *   default          — VersePage
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { GospelSiteHeader } from "@/components/gospel/site-header";
import { GospelSiteFooter } from "@/components/gospel/site-footer";
import { gospelConfig } from "@/lib/gospel";

// ─── Verse pool ───────────────────────────────────────────────
// Must stay in sync with ishgospel-frontend/src/services/verseOfDay.ts
// (LOCAL_POOL) and ishgospel-backend/src/modules/bible/bible.service.ts
// (VERSE_OF_DAY_POOL). Pool index = UTC day-of-year mod pool size.

const VERSE_POOL = [
  { ref: "1 Chronicles 16:11", text: "Look to the Lord and his strength; seek his face always." },
  { ref: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." },
  {
    ref: "Isaiah 41:10",
    text: "So do not fear, for I am with you; do not be dismayed, for I am your God.",
  },
  {
    ref: "Jeremiah 29:11",
    text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you."',
  },
  {
    ref: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him.",
  },
  {
    ref: "Proverbs 3:5–6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
  },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
  {
    ref: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
  },
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son." },
  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path." },
  { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; do not be discouraged." },
  {
    ref: "2 Timothy 1:7",
    text: "For God has not given us a spirit of fear, but of power, love, and a sound mind.",
  },
  {
    ref: "Romans 12:2",
    text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
  },
  {
    ref: "Ephesians 2:8–9",
    text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.",
  },
  {
    ref: "James 1:5",
    text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.",
  },
  {
    ref: "Galatians 2:20",
    text: "I have been crucified with Christ and I no longer live, but Christ lives in me.",
  },
  {
    ref: "Hebrews 11:1",
    text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
  },
  {
    ref: "Psalm 37:4",
    text: "Take delight in the Lord, and he will give you the desires of your heart.",
  },
  {
    ref: "John 14:6",
    text: "I am the way and the truth and the life. No one comes to the Father except through me.",
  },
  {
    ref: "Lamentations 3:22–23",
    text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.",
  },
  {
    ref: "Matthew 6:33",
    text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
  },
  {
    ref: "1 Corinthians 13:4",
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
  },
  {
    ref: "Colossians 3:23",
    text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
  },
  {
    ref: "Romans 5:8",
    text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
  },
  {
    ref: "Psalm 121:1–2",
    text: "I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord.",
  },
  {
    ref: "2 Corinthians 12:9",
    text: "My grace is sufficient for you, for my power is made perfect in weakness.",
  },
  {
    ref: "Micah 6:8",
    text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy.",
  },
] as const;

type Verse = (typeof VERSE_POOL)[number];

function verseForDate(dateStr: string): Verse | null {
  // Accept YYYY-MM-DD only
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const date = new Date(dateStr + "T00:00:00Z");
  if (isNaN(date.getTime())) return null;

  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return VERSE_POOL[dayOfYear % VERSE_POOL.length];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00Z");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const verse = verseForDate(date);
  if (!verse) return { title: "Not Found" };

  const title = `${verse.ref} — IshGospel Verse of the Day`;
  const description = verse.text.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${gospelConfig.url}/verse/${date}`,
      siteName: gospelConfig.name,
      images: [{ url: "/api/og/gospel", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/api/og/gospel"],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────

export default async function VersePage({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}) {
  const { locale, date } = await params;
  setRequestLocale(locale);

  const verse = verseForDate(date);
  if (!verse) notFound();

  const displayDate = formatDate(date);
  const deepLink = `ishgospel://verse/${date}`;
  const playStore = gospelConfig.store.playStore;
  const appStore = gospelConfig.store.appStore;

  return (
    <>
      <GospelSiteHeader />
      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-10">
          {/* Label */}
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-fg-secondary">
            ✦&ensp;Verse of the Day
          </p>

          {/* Verse card */}
          <div
            className="w-full rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0052FF 0%, #001B6B 100%)",
            }}
          >
            {/* Subtle background rings for depth */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 120%, rgba(255,255,255,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Date */}
            <p className="text-xs font-medium tracking-wider uppercase text-white/50 relative z-10">
              {displayDate}
            </p>

            {/* Verse text */}
            <blockquote className="text-xl leading-relaxed font-light text-white relative z-10">
              &ldquo;{verse.text}&rdquo;
            </blockquote>

            {/* Reference */}
            <p className="text-sm text-white/70 italic text-right relative z-10">
              &mdash;&thinsp;{verse.ref}
            </p>

            {/* Watermark */}
            <p className="text-[10px] text-white/30 font-semibold tracking-wide text-right relative z-10 mt-2">
              IshGospel ✦
            </p>
          </div>

          {/* CTAs */}
          <div className="w-full flex flex-col gap-3">
            {/* Deep link — opens app if installed, ignored gracefully if not */}
            <a
              href={deepLink}
              className="w-full flex items-center justify-center gap-2 rounded-2xl px-6 py-4 bg-accent text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-80"
            >
              <span>Open in IshGospel</span>
              <span aria-hidden>→</span>
            </a>

            {/* Store badges */}
            <div className="flex gap-3">
              {appStore !== "#" && (
                <a
                  href={appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 border border-border text-fg text-sm font-medium transition-colors hover:bg-surface"
                >
                  Download on App Store
                </a>
              )}
              {playStore !== "#" && (
                <a
                  href={playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 border border-border text-fg text-sm font-medium transition-colors hover:bg-surface"
                >
                  Get on Google Play
                </a>
              )}
              {appStore === "#" && playStore === "#" && (
                <a
                  href={gospelConfig.url}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 border border-border text-fg text-sm font-medium transition-colors hover:bg-surface"
                >
                  Learn about IshGospel
                </a>
              )}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm text-fg-secondary text-center max-w-xs">
            IshGospel is a structured spiritual formation app — Bible, prayer, community, and
            vision.
          </p>
        </div>
      </main>
      <GospelSiteFooter />
    </>
  );
}
