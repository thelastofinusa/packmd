import React from "react"
import {
  BoltLightning,
  Code2Newicons,
  Earth,
  GlobePointer,
  Package,
} from "reicon-react"
import { Frame } from "@packmd/ui/components/reui/frame"
import { MaxContainer } from "@/components/max-container"
import { Separator } from "@packmd/ui/components/separator"
import { InstallTabs } from "@packmd/ui/components/install-tabs"
import { ApiReference, type ApiProp } from "@packmd/ui/components/api-reference"
import { CodeBlock } from "@packmd/ui/components/code-block"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to use PackMD's CLI and web app. Explore the core engine, API reference, processing pipeline, and step-by-step guides.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Documentation",
    description:
      "Learn how to use PackMD's CLI and web app. Explore the core engine, API reference, processing pipeline, and step-by-step guides.",
    url: "/docs",
  },
  twitter: {
    title: "Documentation",
    description:
      "Learn how to use PackMD's CLI and web app. Explore the core engine, API reference, processing pipeline, and step-by-step guides.",
  },
}

const API_REFERENCE: ApiProp[] = [
  {
    name: "output",
    type: "--output",
    defaultValue: "-o",
    description: "Specify output file path (e.g., digest.md)",
  },
  {
    name: "copy",
    type: "--copy",
    defaultValue: "-c",
    description: "Copy output directly to clipboard upon completion",
  },
  {
    name: "token",
    type: "--token",
    defaultValue: "-t",
    description:
      "GitHub Personal Access Token for private repos / higher rate limits",
  },
  {
    name: "max-files",
    type: "--max-files",
    defaultValue: "-m",
    description: "Limit total number of files to include (default: 200)",
  },
  {
    name: "max-file-size",
    type: "--max-file-size",
    defaultValue: "-s",
    description:
      "Maximum allowed size (in KB) for individual files (default: 100)",
  },
  {
    name: "include",
    type: "--include",
    defaultValue: "-i",
    description: "Glob patterns to explicitly include files or directories",
  },
  {
    name: "exclude",
    type: "--exclude",
    defaultValue: "-e",
    description: "Glob patterns to explicitly ignore files or directories",
  },
  {
    name: "jina-api-key",
    type: "--jina-api-key",
    description: "Jina API key for enhanced webpage scraping and parsing",
  },
  {
    name: "no-gitignore",
    type: "--no-gitignore",
    description:
      "Don't respect .gitignore rules when scanning a local directory",
  },
]

export default async function Docs() {
  const basicUsageCode = `# Pack a GitHub repository or remote web page into clean Markdown
packmd https://github.com/expressjs/express -o express-digest.md -m 300
packmd https://docs.nestjs.com --copy --jina-api-key your-api-key`

  const sections = [
    {
      id: "overview",
      title: "Overview & Engine",
      content: (
        <>
          <p className="text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
            Behind the scenes, PackMD combines high‑performance filesystem
            traversal with modern web scraping APIs. It strips noise, parses
            syntax, and formats everything into a unified context window.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-3 pt-2 md:grid-cols-2">
            <Frame variant="inverse" className="rounded-xl">
              <div className="h-full space-y-2 rounded-lg border bg-card p-4">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <BoltLightning className="size-4" />
                  <span>Repositories & Local</span>
                </h3>
                <p className="text-sm leading-normal text-muted-foreground">
                  Scans projects, respects <strong>.gitignore</strong>, and
                  generates structured Markdown.
                </p>
              </div>
            </Frame>
            <Frame variant="inverse" className="rounded-xl">
              <div className="h-full space-y-2 rounded-lg border bg-card p-4">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <Earth className="size-4" />
                  <span>Web Pages via Jina</span>
                </h3>
                <p className="text-sm leading-normal text-muted-foreground">
                  Converts web pages into clean Markdown by removing unnecessary
                  page content.
                </p>
              </div>
            </Frame>
          </div>
        </>
      ),
    },
    {
      id: "cli",
      title: "CLI & Web Usage",
      content: (
        <>
          <p className="text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
            Run PackMD instantly from your terminal or plug it into our web
            interface for live previews and instant clipboard copying.
          </p>
          <div className="mt-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Installation
              </span>
              <Frame variant="inverse" className="rounded-xl">
                <InstallTabs item="packmd" />
              </Frame>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Usage</span>
              <Frame variant="inverse" className="rounded-xl">
                <CodeBlock fileName="~terminal" source={basicUsageCode} />
              </Frame>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                CLI Options &amp; Flags
              </span>
              <Frame variant="inverse" className="rounded-xl">
                <ApiReference props={API_REFERENCE} />
              </Frame>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "architecture",
      title: "How It Works",
      content: (
        <>
          <p className="text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
            PackMD is built around a shared core used by both the web app and
            CLI.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
            <Frame variant="inverse" className="rounded-xl">
              <div className="h-full rounded-lg border bg-card p-4">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <Package className="size-3.5" />
                  <span>@packmd/core</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fetches content and converts it into clean Markdown.
                </p>
              </div>
            </Frame>
            <Frame variant="inverse" className="rounded-xl">
              <div className="h-full rounded-lg border bg-card p-4">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <GlobePointer className="size-3.5" />
                  <span>Web App</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browser interface for generating and managing Markdown.
                </p>
              </div>
            </Frame>
            <Frame variant="inverse" className="rounded-xl">
              <div className="h-full rounded-lg border bg-card p-4">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <Code2Newicons className="size-3.5" />
                  <span>CLI</span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Command-line tool powered by the same core engine.
                </p>
              </div>
            </Frame>
          </div>
        </>
      ),
    },
    {
      id: "pipeline",
      title: "Processing Pipeline",
      content: (
        <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
          <Frame variant="inverse" className="rounded-xl">
            <div className="flex h-full flex-col gap-1 rounded-lg border bg-card p-4">
              <h4 className="font-semibold">URL Parsing</h4>
              <p className="text-sm text-muted-foreground">
                Detects GitHub repositories or web pages.
              </p>
            </div>
          </Frame>
          <Frame variant="inverse" className="rounded-xl">
            <div className="flex h-full flex-col gap-1 rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Fetching</h4>
              <p className="text-sm text-muted-foreground">
                Retrieves repo files or webpage content.
              </p>
            </div>
          </Frame>
          <Frame variant="inverse" className="rounded-xl">
            <div className="flex h-full flex-col gap-1 rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Filtering</h4>
              <p className="text-sm text-muted-foreground">
                Applies ignore rules, globs, and size limits.
              </p>
            </div>
          </Frame>
          <Frame variant="inverse" className="rounded-xl">
            <div className="flex h-full flex-col gap-1 rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Downloading</h4>
              <p className="text-sm text-muted-foreground">
                Downloads file contents in parallel.
              </p>
            </div>
          </Frame>
          <Frame variant="inverse" className="rounded-xl">
            <div className="flex h-full flex-col gap-1 rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Tree Building</h4>
              <p className="text-sm text-muted-foreground">
                Builds a structured directory tree.
              </p>
            </div>
          </Frame>
          <Frame variant="inverse" className="rounded-xl">
            <div className="flex h-full flex-col gap-1 rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Markdown Generation</h4>
              <p className="text-sm text-muted-foreground">
                Produces clean, LLM‑ready Markdown.
              </p>
            </div>
          </Frame>
        </div>
      ),
    },
  ]

  return (
    <section className="flex-1 overflow-x-clip">
      <div className="py-8 md:pb-24">
        <MaxContainer size="md">
          {/* ----- Header ----- */}
          <header className="flex flex-col">
            <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
              {"//"} Documentation
            </span>
            <h1 className="mt-2 mb-3 text-2xl font-semibold sm:mb-4 md:text-3xl">
              How PackMD Works
            </h1>
            <p className="max-w-lg text-sm leading-relaxed font-normal text-muted-foreground sm:text-base">
              PackMD converts codebases, local directories, and live web pages
              into clean, token‑efficient Markdown for LLMs.
            </p>
          </header>

          {/* ----- Loop through sections ----- */}
          {sections.map((section) => (
            <React.Fragment key={section.id}>
              <Separator orientation="horizontal" className="my-8" />
              <section id={section.id} className="flex flex-col gap-2">
                <h2 className="flex items-center gap-1 text-lg font-medium sm:text-xl">
                  <span>{section.title}</span>
                </h2>
                {section.content}
              </section>
            </React.Fragment>
          ))}
        </MaxContainer>
      </div>
    </section>
  )
}
