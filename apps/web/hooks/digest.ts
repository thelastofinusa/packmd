import { create } from "zustand"
import {
  DEFAULT_OPTIONS,
  type DigestOptions,
  type DigestResult,
} from "@git2txt/core"

export interface UseDigestState {
  loading: boolean
  error: string | null
  progress: string | null
  data: DigestResult | null
  options: DigestOptions
  setOptions: (next: DigestOptions) => void
  generate: (input: string, opts?: Partial<DigestOptions>) => Promise<void>
  reset: () => void
}

export const useDigest = create<UseDigestState>((set, get) => ({
  loading: false,
  error: null,
  progress: null,
  data: null,
  options: DEFAULT_OPTIONS,
  setOptions: (next) => set({ options: next }),
  generate: async (input, opts) => {
    const merged: DigestOptions = { ...get().options, ...opts }
    set({
      loading: true,
      error: null,
      progress: "Starting...",
      data: null,
    })
    try {
      const res = await fetch("/api/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, options: merged }),
      })

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(payload?.error || `Request failed (${res.status})`)
      }

      const contentType = res.headers.get("content-type") || ""
      if (contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        const handleChunk = (raw: string) => {
          const lines = raw.split("\n")
          let event = "message"
          const dataLines: string[] = []
          for (const line of lines) {
            if (line.startsWith("event:")) event = line.slice(6).trim()
            else if (line.startsWith("data:"))
              dataLines.push(line.slice(5).trimStart())
          }
          const data = dataLines.join("\n")

          if (event === "progress") set({ progress: data })
          if (event === "error") set({ error: data })
          if (event === "done") {
            const parsed = JSON.parse(data) as DigestResult
            set({ data: parsed })
          }
        }

        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          while (true) {
            const idx = buffer.indexOf("\n\n")
            if (idx === -1) break
            const raw = buffer.slice(0, idx)
            buffer = buffer.slice(idx + 2)
            if (raw.trim()) handleChunk(raw)
          }
        }
      } else {
        const result = (await res.json()) as DigestResult
        set({ data: result })
      }
    } catch (e) {
      if (e instanceof Error) set({ error: e.message })
      else set({ error: "Unknown error" })
    } finally {
      set({ loading: false, progress: null })
    }
  },
  reset: () => set({ data: null, error: null, progress: null }),
}))
