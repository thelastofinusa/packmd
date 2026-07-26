import { ScraperOptions, WebScrapeResult } from "../types"

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
export async function scrapeWebPage(
  url: string,
  options: ScraperOptions = {}
): Promise<WebScrapeResult> {
  const onProgress = options.onProgress || (() => {})
  const maxRetries = options.maxRetries ?? 3
  const timeoutMs = options.timeoutMs || 30000

  // Validate early
  const targetUrl = assertValidUrl(url)
  const fetchUrl = `${JINA_BASE_URL}${targetUrl.toString()}`

  const headers: Record<string, string> = {
    // Requesting JSON gives us a structured response containing the title and markdown separately
    Accept: "application/json",
  }

  // If the user provides a free API key (upgrades limit from 20 RPM to 500 RPM)
  if (options.jinaApiKey) {
    headers["Authorization"] = `Bearer ${options.jinaApiKey}`
  }

  let attempt = 0

  while (attempt <= maxRetries) {
    onProgress(
      `Fetching content via Jina (Attempt ${attempt + 1}/${maxRetries + 1})...`
    )

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

      // Handle Rate Limiting (429 Too Many Requests)
      if (response.status === 429) {
        attempt++
        if (attempt > maxRetries) {
          throw new Error("Rate limit exceeded. Maximum retries reached.")
        }

        // Check if Jina provided a specific wait time, otherwise fallback to exponential backoff
        const retryAfter = response.headers.get("Retry-After")
        const waitTime = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : attempt * 5000

        onProgress(
          `Rate limit hit. Waiting ${waitTime / 1000} seconds before retrying...`
        )
        await delay(waitTime)
        continue // Restart the loop
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

      const { title, content, description } = json.data

      const finalTitle = title || "Untitled Page"
      const markdown = `## ${finalTitle}\n\n${content}`

      onProgress("Scraping complete.")

      return {
        url: targetUrl.toString(),
        title: finalTitle,
        content: content,
        markdown: markdown,
        excerpt: description,
        // Jina doesn't currently extract byline/siteName specifically, so we can omit or null them
        byline: null,
        siteName: null,
        rendered: true, // Jina handles JS rendering internally
      }
    } catch (err: any) {
      clearTimeout(timeout)

      if (err.name === "AbortError") {
        throw new Error(`Request timed out after ${timeoutMs}ms`)
      }

      // If it's a network error and we have retries left, wait and try again
      if (attempt < maxRetries && !err.message.includes("Rate limit")) {
        attempt++
        onProgress(`Network error: ${err.message}. Retrying in 2 seconds...`)
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
