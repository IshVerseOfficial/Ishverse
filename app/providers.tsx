/**
 * Module: App Providers
 * Context: See DESIGN.md §2 — two-theme system (pure black / white), OS default.
 *
 * Wraps the app in next-themes so the theme auto-detects the OS preference
 * (defaultTheme="system", enableSystem) and can be toggled manually. The theme
 * is applied as a `class` on <html> (matches the `.dark` selector in globals.css)
 * and persisted to localStorage by next-themes.
 *
 * Exports:
 *   Providers — client component wrapping {children} with ThemeProvider
 */

"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
