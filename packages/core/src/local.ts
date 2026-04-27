import { readdir, stat, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import type {
  RepoFile,
  SkippedFile,
  DigestResult,
  DigestOptions,
} from "./types";
import { matchesAny } from "./lib/glob";
import { buildTreeStructure } from "./lib/buildTree";
import { buildDigest, estimateTokens } from "./lib/formatter";

const LOCAL_IGNORE_DEFAULTS = [
  "node_modules/**",
  ".git/**",
  "dist/**",
  "build/**",
  ".next/**",
  "out/**",
  "vendor/**",
  "__pycache__/**",
  "*.lock",
  "*.png",
  "*.jpg",
  "*.jpeg",
  "*.gif",
  "*.webp",
  "*.svg",
  "*.ico",
  "*.woff",
  "*.woff2",
  "*.ttf",
  "*.otf",
  "*.mp4",
  "*.mp3",
  "*.zip",
  "*.tar",
  "*.gz",
];

export async function fetchLocalDigest(
  rootDir: string,
  options: DigestOptions,
  onProgress?: (msg: string) => void,
  onFile?: (file: RepoFile) => void,
): Promise<DigestResult> {
  const dirName = relative(process.cwd(), rootDir) || ".";
  const repoOwner = "local";
  const repoName = dirName === "." ? "current-dir" : dirName.split("/").pop()!;
  const description = null;
  const defaultBranch = ""; // no branch for local

  const skipped: SkippedFile[] = [];
  const files: RepoFile[] = [];

  const maxBytes = options.maxFileSizeKB * 1024;
  const excludePatterns = [...LOCAL_IGNORE_DEFAULTS, ...options.excludeGlobs];

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relPath = relative(rootDir, fullPath).replace(/\\/g, "/");

      // Apply exclude globs
      if (matchesAny(relPath, excludePatterns)) {
        skipped.push({ path: relPath, reason: "excluded" });
        continue;
      }
      // If includeGlobs set, must match
      if (
        options.includeGlobs.length > 0 &&
        !matchesAny(relPath, options.includeGlobs)
      ) {
        skipped.push({ path: relPath, reason: "excluded" });
        continue;
      }

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        try {
          const stats = await stat(fullPath);
          if (stats.size > maxBytes) {
            skipped.push({
              path: relPath,
              reason: "too_large",
              size: stats.size,
            });
            continue;
          }
          // check binary
          const buffer = await readFile(fullPath);
          const isBinary = buffer.includes(0);
          if (isBinary) {
            skipped.push({ path: relPath, reason: "binary", size: stats.size });
            continue;
          }
          const content = buffer.toString("utf-8");
          const fileEntry: RepoFile = {
            path: relPath,
            content,
            size: stats.size,
          };
          files.push(fileEntry);
          onFile?.(fileEntry);
        } catch {
          skipped.push({ path: relPath, reason: "fetch_failed" });
        }
      }
    }
  }

  onProgress?.("Scanning directory...");
  await walk(rootDir);

  // Apply maxFiles cap
  files.sort((a, b) => a.path.localeCompare(b.path));
  const overLimit = files.slice(options.maxFiles);
  for (const f of overLimit) {
    const idx = files.indexOf(f);
    if (idx !== -1) files.splice(idx, 1);
    skipped.push({ path: f.path, reason: "over_limit", size: f.size });
  }

  const tree = buildTreeStructure(files.map((f) => f.path));
  const digest = buildDigest({
    owner: repoOwner,
    repo: repoName,
    description,
    defaultBranch,
    tree,
    files,
    skipped,
  });
  const totalChars = files.reduce((s, f) => s + f.content.length, 0);

  return {
    owner: repoOwner,
    repo: repoName,
    description,
    defaultBranch,
    files,
    tree,
    skipped,
    totalCharacters: totalChars,
    estimatedTokens: estimateTokens(totalChars),
    digest,
  };
}
