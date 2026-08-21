/**
 * Module: RizeSupportForm
 * Context: See AGENTS.md — client component for the /support page.
 *
 * Name + email + message form that posts to /api/support. Validates
 * client-side, shows inline status, and resets on success.
 *
 * Exports:
 *   RizeSupportForm — client component
 */

"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function RizeSupportForm() {
  const t = useTranslations("rize.support");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{t("title")}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-secondary">{t("description")}</p>

      {status === "sent" ? (
        <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-[15px] font-medium text-fg">{t("successTitle")}</p>
          <p className="mt-1 text-[14px] text-fg-secondary">{t("successBody")}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-[13px] font-medium text-accent hover:underline"
          >
            {t("sendAnother")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-[13px] font-medium text-fg">
              {t("labelName")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1.5 w-full rounded-lg border border-divider bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder={t("placeholderName")}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-fg">
              {t("labelEmail")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-lg border border-divider bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder={t("placeholderEmail")}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-[13px] font-medium text-fg">
              {t("labelMessage")}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1.5 w-full resize-none rounded-lg border border-divider bg-bg px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder={t("placeholderMessage")}
            />
          </div>

          {status === "error" && (
            <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-[10px] bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" aria-hidden />
            {status === "sending" ? t("sending") : t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}
