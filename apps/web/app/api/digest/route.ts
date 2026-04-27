import { NextResponse } from "next/server"
import {
  GitHubError,
  fetchDigest,
  type DigestOptions,
  parseRepoUrl,
} from "@git2txt/core"

function formatSse(event: string, data: string) {
  const lines = data.split("\n")
  return `event: ${event}\n${lines.map((l) => `data: ${l}`).join("\n")}\n\n`
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    input?: string
    options?: DigestOptions
  } | null

  const input = body?.input?.trim()
  const options = body?.options

  if (!input || !options) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const parsed = parseRepoUrl(input)
  if (!parsed) {
    return NextResponse.json(
      { error: "Could not parse a GitHub repository from that input." },
      { status: 400 }
    )
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: string) => {
        controller.enqueue(encoder.encode(formatSse(event, data)))
      }

      send("progress", "Please wait...")

      try {
        const result = await fetchDigest(
          parsed.owner,
          parsed.repo,
          options,
          (m) => send("progress", m)
        )
        send("done", JSON.stringify(result))
      } catch (e) {
        if (e instanceof GitHubError) {
          if (
            e.kind === "not_found" &&
            options.token?.startsWith("github_pat_")
          ) {
            send(
              "error",
              "Repository not found. If you're using a fine‑grained token (github_pat_), you must grant it access to this repo (Repository access → select repo) and set Contents: Read."
            )
          } else {
            send(
              "error",
              e.message.includes("fetch failed")
                ? "Looks like there's a problem with your network."
                : e.message
            )
          }
        } else if (e instanceof Error) {
          send("error", e.message)
        } else {
          send("error", "Unknown error")
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
