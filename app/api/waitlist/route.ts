/**
 * Module: Waitlist API Route
 * Context: Ported from ishgospel-web — persists to the shared backend
 * (POST /api/v1/waitlist on ishgospel-backend, hosted on Railway).
 *
 * Validates the email, then forwards the signup to the backend (server-side, so
 * the backend URL/CORS never touch the browser). Tags the signup with
 * source "web-landing". Maps backend status: 2xx → ok, 429 → rate limited,
 * 4xx → bad request, anything else → 502.
 *
 * Exports:
 *   POST — route handler
 */

import { NextResponse } from "next/server";
import { apiBaseUrl } from "@/lib/gospel";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "web-landing" }),
    });

    if (res.ok) return NextResponse.json({ ok: true });
    if (res.status === 429) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    if (res.status >= 400 && res.status < 500) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Could not reach the waitlist service" }, { status: 502 });
  }
}
