import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveCssColor(color: string) {
  if (!color.startsWith("var(")) return color

  const variable = color.slice(4, -1).trim()

  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
}
