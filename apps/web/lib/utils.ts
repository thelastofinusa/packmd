export async function sleep(duration = 1000, name = "Timer"): Promise<void> {
  await new Promise((resolve) => setTimeout(() => resolve({ name }), duration))
}

// Extract the first markdown heading or fall back to the URL
export function extractTitle(md: string, fallback?: string): string {
  const lines = md.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("# ")) {
      return trimmed.replace(/^#\s+/, "")
    }
    if (trimmed.startsWith("## ")) {
      return trimmed.replace(/^##\s+/, "")
    }
  }
  return fallback || "Untitled"
}
