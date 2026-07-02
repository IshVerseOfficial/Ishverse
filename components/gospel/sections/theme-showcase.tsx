/**
 * Module: GospelThemeShowcase
 * Context: Ported from ishgospel-web — "pure black ↔ pure white, no
 * intermediate" (ishgospel-docs/BRAND.md).
 *
 * Shows both themes at once. The two preview cards hardcode the light/dark
 * palettes (so they display regardless of the active theme) — a deliberate
 * physical-scene exception to the token rule.
 *
 * Exports:
 *   GospelThemeShowcase — server component
 */

import { Section } from "../../ui/section";

function PreviewCard({ mode, label }: { mode: "light" | "dark"; label: string }) {
  const p =
    mode === "light"
      ? {
          bg: "#ffffff",
          surface: "#f5f5f5",
          fg: "#1a1a1a",
          sub: "#6b7280",
          border: "rgba(0,0,0,0.08)",
        }
      : {
          bg: "#000000",
          surface: "#111111",
          fg: "#ffffff",
          sub: "#a1a1aa",
          border: "rgba(255,255,255,0.12)",
        };
  return (
    <div className="rounded-2xl border p-5" style={{ background: p.bg, borderColor: p.border }}>
      <div className="flex items-center justify-between">
        <span style={{ color: p.fg, fontSize: 13, fontWeight: 500 }}>{label}</span>
        <span
          style={{
            background: "rgba(0,82,255,0.12)",
            color: "#0052ff",
            fontSize: 11,
            fontWeight: 500,
          }}
          className="rounded-full px-2 py-1"
        >
          14-day streak
        </span>
      </div>
      <div className="mt-4 rounded-xl p-4" style={{ background: p.surface }}>
        <p style={{ color: p.sub, fontSize: 12 }}>Formation</p>
        <p style={{ color: p.fg, fontSize: 26, fontWeight: 700, marginTop: 2 }}>86</p>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: p.border }}
        >
          <div style={{ width: "86%", height: "100%", background: "#0052ff", borderRadius: 999 }} />
        </div>
      </div>
      <div
        className="mt-3 rounded-xl px-3 py-2.5 text-center"
        style={{ background: "#0052ff", color: "#fff", fontSize: 13, fontWeight: 500 }}
      >
        Mark today complete
      </div>
    </div>
  );
}

export function GospelThemeShowcase() {
  return (
    <Section className="py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[13px] font-medium uppercase tracking-wide text-gold">
          Designed to disappear
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          Pure black. Pure white.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
          Two themes, no distractions. It follows your system automatically — or switch it yourself,
          any time.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
        <PreviewCard mode="light" label="Pure white" />
        <PreviewCard mode="dark" label="Pure black" />
      </div>
    </Section>
  );
}
