/**
 * Module: Gospel OG Image
 * Context: See implementation_plan.md Phase 8 — social-share card for
 * gospel.ishverse.com, generated at request time with next/og. Brand rules:
 * pure black stage, blue system, gold accent (DESIGN.md §3).
 *
 * Lives under /api/ (not the opengraph-image.tsx metadata-file convention)
 * because the file convention can't be colocated with app/[locale]/gospel/
 * without an ambiguous build output — see Phase 4 fix notes. Referenced
 * explicitly from the gospel page's openGraph.images metadata instead.
 * /api/* is excluded from middleware.ts's matcher, so this route is never
 * touched by subdomain rewriting or locale resolution.
 *
 * Exports:
 *   GET — returns the 1200×630 PNG via ImageResponse
 */

import { ImageResponse } from "next/og";

const SIZE = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#000000",
        backgroundImage: "radial-gradient(circle at 75% 20%, rgba(0,82,255,0.28), transparent 60%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            display: "flex",
            width: "18px",
            height: "18px",
            borderRadius: "9px",
            background: "#A68A4C",
          }}
        />
        <div style={{ display: "flex", fontSize: "34px", color: "#FFFFFF", fontWeight: 700 }}>
          ISH
          <span style={{ color: "#A1A1AA", fontWeight: 400 }}>GOSPEL</span>
        </div>
      </div>
      <div
        style={{
          marginTop: "44px",
          fontSize: "92px",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-2px",
          lineHeight: 1.05,
        }}
      >
        Discipline builds depth.
      </div>
      <div style={{ marginTop: "36px", fontSize: "32px", color: "#A1A1AA" }}>
        A structured spiritual formation system — Bible, prayer, community, and vision.
      </div>
      <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", fontSize: "24px", color: "#A68A4C" }}>
          Part of the Ish ecosystem
        </div>
        <div style={{ display: "flex", fontSize: "24px", color: "#52525B" }}>
          · gospel.ishverse.com
        </div>
      </div>
    </div>,
    SIZE,
  );
}
