/**
 * Module: RizeTimetableGrid
 * Context: See DESIGN.md §3 — the one color metaphor: the system is blue,
 * the man is gold. Validated sessions render blue; the single session a
 * coordinator is moving renders gold, so the picture reads as "the system
 * holds the structure, the human makes the call".
 *
 * The page sells timetabling and never showed a timetable. This is that
 * proof shot: a decorative, non-interactive week grid built from a CSS grid
 * — no images, no canvas, nothing to load, nothing to animate.
 *
 * Course codes are deliberately generic and stay untranslated (they read as
 * codes in every locale); only the day labels and legend come from messages.
 *
 * Exports:
 *   RizeTimetableGrid — server component
 */

import { useTranslations } from "next-intl";

const TIMES = ["09:00", "11:00", "13:00", "15:00"] as const;

/** row = time, col = day. null renders as an open slot. */
const CELLS: ({ code: string; room: string; moving?: boolean } | null)[][] = [
  [
    { code: "MATH 201", room: "JQB 08" },
    null,
    { code: "PHYS 110", room: "NNB 12" },
    null,
    { code: "MATH 201", room: "JQB 08" },
  ],
  [
    null,
    { code: "STAT 301", room: "CSB Lab", moving: true },
    null,
    { code: "STAT 301", room: "CSB Lab" },
    null,
  ],
  [
    { code: "CHEM 104", room: "CHEM A" },
    null,
    { code: "CHEM 104", room: "CHEM A" },
    null,
    { code: "PHYS 110", room: "NNB 12" },
  ],
  [null, { code: "ENGL 150", room: "JQB 21" }, null, { code: "ENGL 150", room: "JQB 21" }, null],
];

export function RizeTimetableGrid() {
  const t = useTranslations("rize.grid");
  const days = [t("day1"), t("day2"), t("day3"), t("day4"), t("day5")];

  return (
    <figure className="mt-14 sm:mt-16">
      <div className="overflow-hidden rounded-2xl border border-divider bg-surface p-3 text-left sm:p-5">
        {/* Day header — the leading empty cell aligns with the time gutter. */}
        <div className="grid grid-cols-[2.6rem_repeat(5,1fr)] gap-1 sm:grid-cols-[3.4rem_repeat(5,1fr)] sm:gap-1.5">
          <div aria-hidden />
          {days.map((day) => (
            <div
              key={day}
              className="pb-1 text-center text-[10px] font-medium uppercase tracking-wide text-fg-secondary sm:text-[11px]"
            >
              {day}
            </div>
          ))}

          {CELLS.map((row, r) => (
            <div key={TIMES[r]} className="contents">
              <div className="flex items-center justify-end pr-1 text-[9px] tabular-nums text-fg-secondary sm:text-[11px]">
                {TIMES[r]}
              </div>
              {row.map((cell, c) =>
                cell ? (
                  <div
                    key={`${r}-${c}`}
                    className={`rounded-md px-1 py-1.5 sm:px-2 sm:py-2 ${
                      cell.moving
                        ? "bg-gold/15 ring-1 ring-gold/40"
                        : "bg-accent/10 ring-1 ring-accent/20"
                    }`}
                  >
                    <p
                      className={`truncate text-[9px] font-medium leading-tight sm:text-[11px] ${
                        cell.moving ? "text-gold-text" : "text-accent-text"
                      }`}
                    >
                      {cell.code}
                    </p>
                    <p className="mt-0.5 truncate text-[8px] leading-tight text-fg-secondary sm:text-[10px]">
                      {cell.room}
                    </p>
                  </div>
                ) : (
                  <div
                    key={`${r}-${c}`}
                    className="rounded-md border border-dashed border-divider"
                    aria-hidden
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-fg-secondary sm:text-[12px]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-accent/40 ring-1 ring-accent/30" aria-hidden />
          {t("legendPlaced")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-gold/40 ring-1 ring-gold/40" aria-hidden />
          {t("legendMoving")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm border border-dashed border-divider" aria-hidden />
          {t("legendFree")}
        </span>
      </figcaption>
    </figure>
  );
}
