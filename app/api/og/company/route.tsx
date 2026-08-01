/**
 * Module: Company OG Image
 * Context: Social-share card for ishverse.com. Brand rules: pure black
 * stage, blue system, gold accent (DESIGN.md §3).
 *
 * Exports:
 *   GET — returns the 1200x630 PNG via ImageResponse
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
          <span style={{ color: "#A1A1AA", fontWeight: 400 }}>VERSE</span>
        </div>
      </div>
      <div
        style={{
          marginTop: "44px",
          fontSize: "86px",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-2px",
          lineHeight: 1.05,
        }}
      >
        Systems for Intentional Growth.
      </div>
      <div style={{ marginTop: "36px", fontSize: "32px", color: "#A1A1AA" }}>
        One discipline system per domain of life. A man, in command of his world.
      </div>
      <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", fontSize: "24px", color: "#A68A4C" }}>
          IshRize · IshGospel
        </div>
        <div style={{ display: "flex", fontSize: "24px", color: "#52525B" }}>· ishverse.com</div>
      </div>
    </div>,
    SIZE,
  );
}
