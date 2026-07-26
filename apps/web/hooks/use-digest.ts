import { create } from "zustand"

export type DigestState = {
  loading: boolean
  error: string | null
  progress: string | null
  data: { digest: string; url: string } | null
  generate: (url: string, options?: any) => Promise<void>
  reset: () => void
}

export const useDigest = create<DigestState>((set) => ({
  loading: false,
  error: null,
  progress: null,
  data: null,

  generate: async (url: string, options = {}) => {
    set({
      loading: true,
      error: null,
      progress: "Generating Markdown. Please wait..",
      data: null,
    })

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: url, options }),
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

          // FIXED: Reset loading and progress when an error occurs
          if (event === "error") {
            set({ error: data, loading: false, progress: null })
          }

          if (event === "done") {
            const parsed = JSON.parse(data)
            set({ data: parsed, loading: false, progress: null })
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
        // Fallback if not SSE (shouldn't happen)
        const result = await res.json()
        set({ data: result, loading: false, progress: null })
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error"
      set({ error: message, loading: false, progress: null })
    }
  },

  reset: () => set({ data: null, error: null, progress: null, loading: false }),
}))
