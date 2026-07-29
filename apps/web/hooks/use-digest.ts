"use client"

import { create } from "zustand"

export type DigestData = {
  digest: string
  url: string
}

export type DigestOptions = {
  maxFileSizeKB?: number
  maxFiles?: number
  includeGlobs?: string[]
  excludeGlobs?: string[]
  token?: string
}

type SseEventName = "progress" | "error" | "done"

export type DigestState = {
  loading: boolean
  error: string | null
  progress: string | null
  data: DigestData | null
  generate: (url: string, options?: DigestOptions) => Promise<void>
  reset: () => void
}

const INITIAL_STATE: Pick<
  DigestState,
  "loading" | "error" | "progress" | "data"
> = {
  loading: false,
  error: null,
  progress: null,
  data: null,
}

/**
 * Parse a single SSE message block. The format is:
 *
 *   event: <name>\n
 *   data: <line1>\n
 *   data: <line2>\n
 *   \n
 *
 * Returns `null` if the block is empty / malformed.
 */
function parseSseBlock(
  raw: string
): { event: SseEventName; data: string } | null {
  if (!raw.trim()) return null

  let event: SseEventName | null = null
  const dataLines: string[] = []

  for (const line of raw.split("\n")) {
    if (line.startsWith("event:")) {
      const candidate = line.slice(6).trim() as SseEventName
      if (
        candidate === "progress" ||
        candidate === "error" ||
        candidate === "done"
      ) {
        event = candidate
      }
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart())
    }
  }

  if (!event) return null
  return { event, data: dataLines.join("\n") }
}

async function consumeSseStream(
  res: Response,
  onEvent: (event: { event: SseEventName; data: string }) => void,
  signal?: AbortSignal
): Promise<void> {
  if (!res.body) {
    throw new Error("The server returned an empty response body.")
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  try {
    while (true) {
      if (signal?.aborted) {
        try {
          await reader.cancel()
        } catch {
          /* noop */
        }
        return
      }

      const { value, done } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // SSE messages are separated by a blank line. Process every
      // complete block we have and keep the trailing partial block in
      // the buffer for the next read.
      let boundary = buffer.indexOf("\n\n")
      while (boundary !== -1) {
        const block = buffer.slice(0, boundary)
        buffer = buffer.slice(boundary + 2)
        const parsed = parseSseBlock(block)
        if (parsed) onEvent(parsed)
        boundary = buffer.indexOf("\n\n")
      }
    }

    // Flush any trailing block that didn't end with a blank line.
    if (buffer.trim()) {
      const parsed = parseSseBlock(buffer)
      if (parsed) onEvent(parsed)
    }
  } catch (err) {
    if (signal?.aborted) return
    throw err
  }
}

export const useDigest = create<DigestState>((set) => ({
  ...INITIAL_STATE,

  generate: async (url: string, options: DigestOptions = {}) => {
    set({
      loading: true,
      error: null,
      progress: "Generating Markdown. Please wait..",
      data: null,
    })

    const controller = new AbortController()

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: url, options }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(payload?.error || `Request failed (${res.status})`)
      }

      const contentType = res.headers.get("content-type") || ""
      const isSse = contentType.includes("text/event-stream")

      if (!isSse) {
        // Fallback: some hosting environments (or future JSON mode)
        // may return a single JSON payload.
        const payload = (await res
          .json()
          .catch(() => null)) as DigestData | null
        if (!payload?.digest) {
          throw new Error("The server returned an empty digest.")
        }
        set({ data: payload, loading: false, progress: null })
        return
      }

      await consumeSseStream(
        res,
        ({ event, data }) => {
          switch (event) {
            case "progress": {
              // Only update progress if we still have an in-flight
              // generation; the user may have navigated away.
              set({ progress: data })
              return
            }
            case "error": {
              set({ error: data, loading: false, progress: null })
              return
            }
            case "done": {
              try {
                const parsed = JSON.parse(data) as DigestData
                if (!parsed?.digest) {
                  set({
                    error: "The server returned an empty digest.",
                    loading: false,
                    progress: null,
                  })
                  return
                }
                set({
                  data: parsed,
                  loading: false,
                  progress: null,
                })
              } catch (err) {
                set({
                  error:
                    err instanceof Error
                      ? `Failed to parse the server response: ${err.message}`
                      : "Failed to parse the server response.",
                  loading: false,
                  progress: null,
                })
              }
            }
          }
        },
        controller.signal
      )

      // Stream ended without an explicit "done" event. If we still
      // appear to be loading (no error, no data), surface a soft error
      // so the caller can recover.
      const { loading, error, data } = useDigest.getState()
      if (loading && !error && !data) {
        set({
          error: "The connection closed before the digest was finished.",
          loading: false,
          progress: null,
        })
      }
    } catch (e) {
      if (controller.signal.aborted) return
      const message = e instanceof Error ? e.message : "Unknown error"
      set({ error: message, loading: false, progress: null })
    }
  },

  reset: () => set({ ...INITIAL_STATE }),
}))
