/**
 * Module: ThemeToggle
 * Context: See DESIGN.md §2 — pure black ↔ pure white, no intermediate.
 *
 * Icon button that flips between light and dark. Theme defaults to the OS
 * preference (see Providers); this lets the user override it. The icon is chosen
 * purely by CSS `dark:` variants (Sun in dark, Moon in light), so there is no
 * hydration mismatch and no JS mount guard. The click reads the live `.dark`
 * class to decide the next theme, which is always correct by interaction time.
 *
 * Exports:
 *   ThemeToggle — client component button
 */

"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-divider text-fg transition-colors hover:bg-glass-bg"
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
