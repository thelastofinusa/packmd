import { NextRequest, NextResponse } from "next/server"
import { fetchGithubRepo, scrapeWebPage } from "@packmd/core"

function formatSse(event: string, data: string) {
  const lines = data.split("\n")
  return `event: ${event}\n${lines.map((l) => `data: ${l}`).join("\n")}\n\n`
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as {
    input?: string
    options?: {
      token?: string
      excludeGlobs?: string[]
      includeGlobs?: string[]
      maxFileSizeKB?: number
      maxFiles?: number
    }
  } | null

  const input = body?.input?.trim()
  const options = body?.options

  if (!input) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(input)
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: string) => {
        controller.enqueue(encoder.encode(formatSse(event, data)))
      }

      // Run async work in the background so Response is returned immediately
      ;(async () => {
        try {
          send("progress", "Generating Markdown. Please wait..")

          let digest: string

          if (
            targetUrl.hostname === "github.com" ||
            targetUrl.hostname === "www.github.com"
          ) {
            const result = await fetchGithubRepo(input, {
              token: options?.token,
              excludeGlobs: options?.excludeGlobs,
              includeGlobs: options?.includeGlobs,
              maxFileSizeKB: options?.maxFileSizeKB,
              maxFiles: options?.maxFiles,
              onProgress: (msg) => send("progress", msg),
            })
            digest = result.markdown
          } else {
            const result = await scrapeWebPage(input, {
              jinaApiKey: process.env.JINA_API_KEY,
            })
            digest = result.markdown
          }

          send("done", JSON.stringify({ digest, url: input }))
        } catch (error: any) {
          console.error("Error in generation stream:", error)

          // Detect socket closures, timeouts, or network terminations
          if (
            error.code === "UND_ERR_SOCKET" ||
            error.message?.includes("terminated") ||
            error.message?.includes("closed") ||
            error.message?.includes("timed out")
          ) {
            send(
              "error",
              error.message ||
                "This repository is too large for a direct serverless generation. Please try providing a GitHub Personal Access Token (PAT) or use a specific subdirectory/branch URL instead."
            )
          } else {
            send("error", error.message || "Generation failed")
          }
        } finally {
          controller.close()
        }
      })()
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}
