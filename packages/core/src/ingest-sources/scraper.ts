import { generateMarkdown } from "../engine/generator"
import { GeneratorOptions, PackmdResult } from "../types"
import { getMarkdownStats } from "../utils/stats"
import { buildFileTree } from "../utils/tree-builder"

const JINA_BASE_URL = "https://r.jina.ai/"

interface JinaResponse {
  code: number
  status: number
  data?: {
    title: string
    description: string
    url: string
    content: string
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Validates the URL format before sending to Jina to fail fast on malformed strings.
 */
function assertValidUrl(rawUrl: string): URL {
  try {
    const parsed = new URL(rawUrl)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Only http and https URLs are supported.")
    }
    return parsed
  } catch {
    throw new Error(`Invalid URL provided: ${rawUrl}`)
  }
}

/**
 * Scrapes a web page and converts it to clean Markdown using the Jina Reader API.
 * Includes built-in rate limiting (HTTP 429) handling and automatic retries.
 */
export interface ScraperOptions {
  jinaApiKey?: string
  maxRetries?: number
  timeoutMs?: number
  onProgress?: (msg: string) => void
  generatorOptions?: Partial<GeneratorOptions>
}

export async function scrapeWebPage(
  url: string,
  options: ScraperOptions = {}
): Promise<PackmdResult> {
  const onProgress = options.onProgress || (() => {})
  const maxRetries = options.maxRetries ?? 3
  const timeoutMs = options.timeoutMs || 30000

  const targetUrl = assertValidUrl(url)
  const fetchUrl = `${JINA_BASE_URL}${targetUrl.toString()}`

  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  if (options.jinaApiKey) {
    headers["Authorization"] = `Bearer ${options.jinaApiKey}`
  }

  let attempt = 0

  while (attempt <= maxRetries) {
    onProgress(`Fetching content (Attempt ${attempt + 1}/${maxRetries + 1})..`)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          ...headers,
          "X-Engine": "browser",
        },
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (response.status === 429) {
        attempt++
        if (attempt > maxRetries) {
          throw new Error("Rate limit exceeded. Maximum retries reached.")
        }

        const retryAfter = response.headers.get("Retry-After")
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : attempt * 5000

        onProgress(
          `Rate limit hit. Waiting ${waitTime / 1000} seconds before retrying..`
        )
        await delay(waitTime)
        continue
      }

      if (!response.ok) {
        throw new Error(
          `Jina API error: ${response.status} ${response.statusText}`
        )
      }

      const json = (await response.json()) as JinaResponse

      if (!json.data || !json.data.content) {
        throw new Error(
          "Jina returned an empty response or failed to parse the page."
        )
      }

      const { title, content: rawContent } = json.data

      // --- FIX: Remove the first heading from the scraped content ---
      // The content from Jina often starts with a heading (e.g., "# Title" or "## Title").
      // We remove it because generateMarkdown will add its own consistent heading with emoji.
      const cleanContent = rawContent.replace(/^#+\s+[^\n]+\n/, "")

      const finalTitle = title || "Untitled Page"
      const sourceUrl = targetUrl.toString()

      const markdown = generateMarkdown(
        { title: finalTitle, sourceUrl, content: cleanContent },
        {
          ...options.generatorOptions,
          headerIcon: options.generatorOptions?.headerIcon ?? "🌐",
        }
      )

      const stats = getMarkdownStats(markdown)

      return {
        sourceUrl,
        title: finalTitle,
        markdown,
        stats,
        files: [
          {
            path: "page-content.md",
            content: cleanContent,
            size: cleanContent.length,
          },
        ],
        metadata: {
          engine: "scraper",
          skippedCount: 0,
        },
      }
    } catch (err: any) {
      clearTimeout(timeout)

      if (err.name === "AbortError") {
        throw new Error(`Request timed out after ${timeoutMs}ms`)
      }

      if (attempt < maxRetries && !err.message.includes("Rate limit")) {
        attempt++
        onProgress(`Network error: ${err.message}. Retrying in 2 seconds..`)
        await delay(2000)
        continue
      }

      throw err
    }
  }

  throw new Error("Failed to scrape the webpage after multiple attempts.")
}

/**
 * Extracts the page title.
 * Re-implemented to ping Jina just for the JSON metadata.
 */
export async function fetchPageTitle(url: string): Promise<string> {
  const result = await scrapeWebPage(url, { maxRetries: 1 })
  return result.title
}
