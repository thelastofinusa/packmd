import { resolve } from "node:path";
import { existsSync } from "node:fs";

// ---------- helpers ----------
function isUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}
function looksLikeRepoSlug(s: string): boolean {
  // owner/repo pattern (letters, digits, dots, hyphens, underscores)
  return /^[\w.-]+\/[\w.-]+$/.test(s);
}
function looksLikeLocalPath(s: string): boolean {
  // starts with . / ~ or a simple file/folder name that exists
  return s.startsWith(".") || s.startsWith("/") || s.startsWith("~");
}
export function resolveSource(input: string | undefined): {
  source: string;
  isLocal: boolean;
} {
  if (!input) {
    return { source: process.cwd(), isLocal: true };
  }
  // absolute URL → GitHub
  if (isUrl(input)) {
    return { source: input, isLocal: false };
  }
  // owner/repo slug → GitHub
  if (looksLikeRepoSlug(input)) {
    return { source: input, isLocal: false };
  }
  // looks like a local path → use it
  if (looksLikeLocalPath(input)) {
    const absolute = resolve(input);
    if (existsSync(absolute)) {
      return { source: absolute, isLocal: true };
    }
    // path doesn't exist – try as GitHub slug anyway as fallback
    return { source: input, isLocal: false };
  }
  // other string that exists? → local
  if (existsSync(input)) {
    return { source: resolve(input), isLocal: true };
  }
  // fallback: treat as GitHub slug
  return { source: input, isLocal: false };
}
