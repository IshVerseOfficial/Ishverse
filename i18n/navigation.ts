/**
 * Module: i18n Navigation
 * Context: locale-aware navigation helpers built from the routing config.
 *
 * Use these instead of next/link + next/navigation so links/redirects keep the
 * active locale prefix automatically.
 *
 * Exports:
 *   Link, redirect, usePathname, useRouter, getPathname — locale-aware
 */

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
