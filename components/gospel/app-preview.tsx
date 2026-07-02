/**
 * Module: AppPreview
 * Context: Ported from ishgospel-web — dashboard-first, glassmorphism, calm.
 *
 * A stylized, CSS-only mock of the mobile app's home screen (no real screenshot
 * asset needed). Used beside the hero copy on desktop. Theme-aware via design
 * tokens; purely decorative, so it's hidden from assistive tech.
 *
 * Exports:
 *   AppPreview — server component
 */

import { BookOpen, Target, Activity, Flame } from "lucide-react";

const ROWS = [
  { icon: BookOpen, label: "Read · John 15", meta: "Done" },
  { icon: Activity, label: "Evening reflection", meta: "2 min" },
  { icon: Target, label: "Vision · 30-day fast", meta: "Day 12" },
];

export function AppPreview() {
  return (
    <div aria-hidden className="relative mx-auto w-[260px] select-none sm:w-[280px]">
      <div className="rounded-[2rem] border border-divider bg-surface p-3 shadow-sm">
        <div className="rounded-[1.5rem] bg-bg p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-fg-secondary">Today</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent">
              <Flame className="h-3 w-3" /> 14-day streak
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-divider p-4">
            <p className="text-[12px] text-fg-secondary">Formation</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-fg">86</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-divider">
              <div className="h-full w-[86%] rounded-full bg-accent" />
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {ROWS.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-3 rounded-xl border border-divider px-3 py-2.5"
              >
                <r.icon className="h-4 w-4 text-accent" />
                <span className="flex-1 text-[13px] text-fg">{r.label}</span>
                <span className="text-[11px] text-fg-secondary">{r.meta}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-accent px-3 py-3 text-center text-[13px] font-medium text-accent-on">
            Mark today complete
          </div>
        </div>
      </div>
    </div>
  );
}
