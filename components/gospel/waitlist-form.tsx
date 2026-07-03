/**
 * Module: WaitlistForm
 * Context: Ported from ishgospel-web — email capture forwarding to the shared
 * backend via the /api/waitlist route handler.
 *
 * Client-side validation with loading / success / error states. Accessible:
 * labelled input, status/alert roles, disabled while submitting.
 *
 * Exports:
 *   WaitlistForm — client component
 */

"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "loading" | "done" | "error";

const STRINGS = {
  emailLabel: "Email address",
  placeholder: "you@example.com",
  submit: "Notify me",
  submitting: "Joining…",
  success: "You're on the list. We'll be in touch.",
  invalid: "Please enter a valid email address.",
  error: "Something went wrong. Please try again.",
} as const;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage(STRINGS.invalid);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(STRINGS.error);
    }
  };

  if (status === "done") {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-2 rounded-[10px] border border-success/40 bg-success/10 px-4 py-3 text-sm font-medium text-success"
      >
        <Check className="h-4 w-4" aria-hidden />
        {STRINGS.success}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          {STRINGS.emailLabel}
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={STRINGS.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="h-11 flex-1 rounded-[10px] border border-divider bg-bg px-4 text-sm text-fg outline-none placeholder:text-fg-secondary focus:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-accent px-5 text-sm font-medium text-accent-on transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? STRINGS.submitting : STRINGS.submit}
          {status !== "loading" && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-[13px] text-error">
          {message}
        </p>
      )}
    </form>
  );
}
