import { useCallback, useState } from "react"
import { fetchDigest, GitHubError } from "@/lib/github"
import { parseRepoUrl } from "@/lib/parseRepoUrl"
import { DEFAULT_OPTIONS, type DigestOptions, type DigestResult } from "@/types"

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

export function useDigest(): UseDigestState {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<string | null>(null)
  const [data, setData] = useState<DigestResult | null>(null)
  const [options, setOptions] = useState<DigestOptions>(DEFAULT_OPTIONS)

  const generate = useCallback(
    async (input: string, opts?: Partial<DigestOptions>) => {
      const merged: DigestOptions = { ...options, ...opts }
      const parsed = parseRepoUrl(input)
      if (!parsed) {
        setError("Could not parse a GitHub repository from that input.")
        return
      }
      setLoading(true)
      setError(null)
      setProgress("Starting…")
      setData(null)
      try {
        const result = await fetchDigest(
          parsed.owner,
          parsed.repo,
          merged,
          setProgress
        )
        setData(result)
      } catch (e) {
        if (e instanceof GitHubError) setError(e.message)
        else if (e instanceof Error) setError(e.message)
        else setError("Unknown error")
      } finally {
        setLoading(false)
        setProgress(null)
      }
    },
    [options]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setProgress(null)
  }, [])

  return {
    loading,
    error,
    progress,
    data,
    options,
    setOptions,
    generate,
    reset,
  }
}
