import { fetchGithubRepo } from "@packmd/core"
import type { Ora } from "ora"

export async function handleGitHub(target: string, options: any, spinner: Ora) {
  const result = await fetchGithubRepo(target, {
    token: options.token,
    maxFiles: Number(options.maxFiles),
    maxFileSizeKB: Number(options.maxFileSize),
    includeGlobs: options.include || [],
    excludeGlobs: options.exclude || [],
    onProgress: (msg) => {
      spinner.text = msg
    },
  })

  return result.markdown
}
