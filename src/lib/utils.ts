import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


/**
 * Helper to combine class names safely for Tailwind projects.
 *
 * Behavior:
 * - `clsx` is used first to conditionally join values (handles arrays, objects,
 *   falsy values, etc.) into a single class string.
 * - `twMerge` then resolves Tailwind-specific class conflicts (for example
 *   `px-2 px-4` -> `px-4`, or conflicting color/utility groups) returning a
 *   compact, final className string ready to apply to `className` props.
 *
 * Why this is useful:
 * - Keeps JSX tidy by letting you pass mixed inputs (strings, objects,
 *   arrays) to `cn(...)` while avoiding duplicated or conflicting Tailwind
 *   utilities.
 * - Prevents bugs where multiple Tailwind classes accidentally override each
 *   other when components compose classes programmatically.
 *
 * Example:
 *   cn("px-2", { "px-4": true }, "text-sm") -> "px-4 text-sm"
 *
 * Types: accepts any values supported by `clsx` (see `ClassValue`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
