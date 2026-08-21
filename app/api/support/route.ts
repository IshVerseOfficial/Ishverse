/**
 * Module: Support API Route
 * Context: Forwards support form submissions to support@ishverse.com via
 * Resend. The form lives at rize.ishverse.com/support.
 *
 * Validates name, email, and message. Rate-limited by Resend's own limits.
 *
 * Exports:
 *   POST — route handler
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let name: unknown, email: unknown, message: unknown;
  try {
    ({ name, email, message } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const sanitizedName = name.trim().slice(0, 200);
  const sanitizedMessage = message.trim().slice(0, 5000);

  try {
    const { error } = await resend.emails.send({
      from: "IshRize Support <noreply@mail.ishverse.com>",
      to: "support@ishverse.com",
      replyTo: email,
      subject: `[IshRize Support] from ${sanitizedName}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="margin: 0 0 16px;">Support request from ${sanitizedName}</h2>
          <p style="margin: 0 0 8px; color: #666;"><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Support email exception:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }
}
