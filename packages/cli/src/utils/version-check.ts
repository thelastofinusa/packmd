import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import color from "picocolors"
import { name } from "../../package.json"

const REGISTRY_URL = `https://registry.npmjs.org/${name}/latest`
const CACHE_PATH = path.join(os.homedir(), `.${name}`, "version-check.json")
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h — don't hit the registry on every run
const FETCH_TIMEOUT_MS = 1500

interface VersionCache {
  lastChecked: number
  latestVersion: string
}

/** Compares plain "x.y.z" strings. 1 if a>b, -1 if a<b, 0 if equal. */
function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number)
  const pb = b.split(".").map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0
    const nb = pb[i] || 0
    if (na > nb) return 1
    if (na < nb) return -1
  }
  return 0
}

async function readCache(): Promise<VersionCache | null> {
  try {
    return JSON.parse(await fs.readFile(CACHE_PATH, "utf-8"))
  } catch {
    return null
  }
}

async function writeCache(data: VersionCache): Promise<void> {
  try {
    await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true })
    await fs.writeFile(CACHE_PATH, JSON.stringify(data), "utf-8")
  } catch {
    // non-fatal — worst case we just check again next run
  }
}

async function fetchLatestVersion(): Promise<string | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(REGISTRY_URL, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.npm.install-v1+json" }, // lightweight abbreviated response
    })
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.version === "string" ? data.version : null
  } catch {
    return null // offline, timed out, registry down — fail silently, never break the CLI
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Returns the latest published version string if it's newer than
 * `currentVersion`, otherwise null. Never throws.
 */
export async function checkForUpdate(
  currentVersion: string
): Promise<string | null> {
  const cache = await readCache()
  const isFresh = cache && Date.now() - cache.lastChecked < CACHE_TTL_MS

  const latestVersion = isFresh
    ? cache.latestVersion
    : await fetchLatestVersion()
  if (!latestVersion) return null

  if (!isFresh) await writeCache({ lastChecked: Date.now(), latestVersion })

  return compareVersions(latestVersion, currentVersion) > 0
    ? latestVersion
    : null
}

export function printUpdateNotice(
  currentVersion: string,
  latestVersion: string
): void {
  console.log()
  console.log(
    color.yellow(`  ↑ Update available: `) +
      color.dim(currentVersion) +
      color.yellow(" → ") +
      color.green(latestVersion)
  )
  console.log(
    color.dim(`  Run `) +
      color.cyan(`npm install -g ${name}@latest`) +
      color.dim(` to update.`)
  )
  console.log()
}
