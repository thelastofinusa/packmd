# 📦 Local Digest — `git2txt`

**Path:** `/Users/holiday/Documents/GitHub/git2txt`  
**Date:** 2026-07-26  
**Files:** 146  
**Est. tokens:** ~87,270

---

## File: .eslintrc.js
```
// Root-level ESLint config for a Turborepo workspace.
// App/package lint rules live in each workspace's eslint.config.js.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/.turbo/**",
    "**/coverage/**",
  ],
}

```

## File: .gitignore
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules
.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
coverage

# next.js
.next/
out/

# production
build
dist

# turbo
.turbo

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
structure.txt
```

## File: .npmrc
```

```

## File: .prettierignore
```
dist/
node_modules/
.next/
.turbo/
coverage/
pnpm-lock.yaml
.pnpm-store/
```

## File: .prettierrc
```
{
  "endOfLine": "lf",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "packages/ui/src/styles/globals.css",
  "tailwindFunctions": ["cn", "cva"]
}

```

## File: .vscode/settings.json
```
{
  "cSpell.words": ["jina", "packmd", "pushout", "reicon", "reui"]
}

```

## File: README.md
```
## PackMD Monorepo

**PackMD** converts any GitHub repository, local directory, or web page into a clean, token‑efficient Markdown digest – ready to paste into ChatGPT, Claude, or any LLM.

### Features

- **One‑click generation** – Paste a URL and get Markdown in seconds.
- **LLM‑optimised** – Strips noise, honours `.gitignore`, and formats content for token efficiency.
- **Web App** – Interactive UI with live preview, history, and editing.
- **CLI** – Run `packmd` from your terminal for scripting and automation.
- **Shared Core** – Single source of truth for parsing, filtering, and Markdown generation.

### Web App – Key Pages

**Home (`/`)**

The main entry point. Paste a GitHub repo URL or a webpage link, adjust advanced options (max files, file size, glob patterns, GitHub token), and click **Generate**. The progress is streamed in real‑time.

![Home Page](https://packmd.vercel.app/assets/home.png)

**History (`/history`)**

Stores all generated digests locally in your browser’s IndexedDB with a 7‑day TTL. You can reopen any digest, remove individual entries, or clear the entire history.

![History Page](https://packmd.vercel.app/assets/history.png)

**Render (`/render?id=...`)**

View, edit, and customise the generated Markdown before copying or downloading. The page offers:

- **Split view** – raw Markdown editor on the left, live preview on the right (collapsible on mobile).
- **Section toggles** – show/hide title, source URL, images, and links.
- **Copy as `.md`** and **Download** buttons.

![Render Page](https://packmd.vercel.app/assets/render.png)

### CLI Tool

Install the CLI globally via npm:

```bash
npm install -g packmd
```

Or run it directly with npx:

```bash
npx packmd <target> [options]
```

**Examples:**

```bash
# Generate digest from a GitHub repo
packmd https://github.com/vercel/next.js -o next.md

# Scrape a webpage (uses Jina Reader API)
packmd https://react.dev --jina-api-key YOUR_KEY

# Digest the current directory
packmd .

# Use advanced options
packmd facebook/react --max-files 300 --exclude "*.test.js" --copy
```

For all options, see the [CLI documentation](<./apps/web/app/(routes)/(landing)/docs/page.tsx>) or run `packmd --help`.

### Development Setup

**Prerequisites**

- **Node.js** ≥ 20
- **Bun** (or npm/pnpm) – the workspace uses Bun by default, but you can use any package manager.

**Install dependencies**

```bash
bun install
# or npm install / pnpm install
```

**Run the web app locally**

```bash
bun run dev --filter=web
# or npm run dev --workspace=web
```

Open `http://localhost:3000`.

**Run the CLI in development**

```bash
bun run dev --filter=cli
# or npm run dev --workspace=cli
```

**Build everything**

```bash
bun run build
```

### License

MIT © [Holiday](https://github.com/thelastofinusa)

```

## File: apps/web/app/(routes)/(landing)/components/footer.tsx
```
"use client"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@packmd/ui/components/tooltip"
import { SOCIALS } from "@/lib/constants"
import { resolveIcon } from "@/lib/icons"
import { MaxContainer } from "@/components/max-container"

export const Footer = () => {
  return (
    <footer className="mt-auto flex w-full items-center gap-4">
      <MaxContainer size="lg" className="py-6">
        <nav className="flex flex-col-reverse items-center justify-between gap-1 sm:flex-row">
          <p className="text-[13px] text-muted-foreground sm:text-sm">
            Built with curiosity and too much coffee.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = resolveIcon(social.url)

              return (
                <a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon className="size-4 text-muted-foreground hover:text-foreground sm:size-3.5" />
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={10}>
                      <p className="text-center font-normal">
                        {social.platform} - {social.name} <br />{" "}
                        {social.username}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </a>
              )
            })}
          </div>
        </nav>
      </MaxContainer>
    </footer>
  )
}

```

## File: apps/web/app/(routes)/(landing)/components/header.tsx
```
import React from "react"
import Link from "next/link"
import { Drop } from "reicon-react"

import { siteConfig } from "@/config/site.config"
import { MaxContainer } from "@/components/max-container"
import { Button } from "@packmd/ui/components/button"
import { ToggleTheme } from "@/components/toggle-theme"
import { Separator } from "@packmd/ui/components/separator"

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-background/60 backdrop-blur-md">
      <MaxContainer size="lg" className="py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <Drop className="mb-px size-4" />
            <p className="text-sm font-medium sm:text-base">
              {siteConfig.name}
            </p>
          </Link>

          <div className="flex items-center">
            <Link href="/docs">
              <Button size="sm" variant="ghost">
                <span>Docs</span>
              </Button>
            </Link>

            <Link href="/history">
              <Button size="sm" variant="ghost">
                <span>History</span>
              </Button>
            </Link>

            <Separator orientation="vertical" className="mx-2 my-auto h-3" />

            <ToggleTheme />
          </div>
        </nav>
      </MaxContainer>
    </header>
  )
}

```

## File: apps/web/app/(routes)/(landing)/docs/page.tsx
```
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

```

## File: apps/web/app/(routes)/(landing)/history/page.tsx
```
"use client"

import React, { useSyncExternalStore } from "react"
import Link from "next/link"
import { Trash2 } from "reicon-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@packmd/ui/components/empty"
import { Button } from "@packmd/ui/components/button"
import { Skeleton } from "@packmd/ui/components/skeleton"
import { resolveIcon } from "@/lib/icons"
import { TOTAL_DAYS, useHistory } from "@/hooks/use-history"
import { MaxContainer } from "@/components/max-container"
import { useTiks } from "@rexa-developer/tiks/react"
import { Separator } from "@packmd/ui/components/separator"
import { Frame } from "@packmd/ui/components/reui/frame"

// Hydration helpers
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )
}

export default function History() {
  const isMounted = useIsMounted()
  const { error } = useTiks()
  const {
    items: historyItems,
    isLoaded,
    remove,
    clear,
    getTimeLeft,
  } = useHistory()

  // Guard against hydration mismatch: keep items empty during initial client hydration pass
  const items = isMounted ? historyItems : []

  return (
    <section className="flex-1 overflow-x-clip">
      <div className="py-8 md:pb-24">
        <MaxContainer size="md">
          <header className="flex flex-col">
            <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
              {"//"} URL History
            </span>
            <h1 className="mt-2 mb-3 text-2xl font-semibold sm:mb-4 md:text-3xl">
              Recent Generations
            </h1>
            <p className="max-w-lg text-sm leading-relaxed font-normal text-muted-foreground sm:text-base">
              View recently generated URLs, reopen them at any time, or remove
              entries before they expire automatically.
            </p>
          </header>

          <Separator orientation="horizontal" className="my-8" />

          <section className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button
                disabled={items.length <= 0}
                variant="destructive"
                className="transition-opacity disabled:opacity-0"
                size="sm"
                data-ignore-click
                onClick={() => {
                  clear()
                  error()
                }}
              >
                <Trash2 className="size-3.5" />
                Clear all
              </Button>
            </div>

            {!isLoaded ? (
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Frame key={index} variant="inverse" className="rounded-xl">
                    <div className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                      <Skeleton className="size-8 rounded-full" />

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <Skeleton className="h-2.5 w-full rounded-[9px]" />
                        <Skeleton className="h-2 w-20 rounded-[9px]" />
                      </div>
                      <Skeleton className="-mr-1 size-6 rounded-full" />
                    </div>
                  </Frame>
                ))}
              </ul>
            ) : items.length === 0 ? (
              <Empty className="pt-6">
                <EmptyHeader>
                  <EmptyMedia>
                    <StackedCardsIllustration />
                  </EmptyMedia>
                  <EmptyTitle>No history yet.</EmptyTitle>
                  <EmptyDescription>
                    Generated URLs are saved locally and automatically removed
                    after {TOTAL_DAYS} days.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {items.map((item) => {
                  const Icon = resolveIcon(item.url)
                  const left = getTimeLeft(item.expiresAt)

                  return (
                    <Frame
                      key={item.id}
                      variant="inverse"
                      className="rounded-xl"
                    >
                      <div className="group flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                        {/* Icon Container */}
                        <Icon className="size-6 text-foreground/70 transition-colors group-hover:text-foreground" />

                        {/* Content */}
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <Link
                            href={`/render?id=${item.id}`}
                            className="truncate text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                          >
                            {item.url}
                          </Link>

                          {/* Expiration Timer */}
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="relative mr-2 flex size-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex size-1.5 rounded-full bg-green-500"></span>
                            </span>
                            <span className="truncate font-medium tracking-tight">
                              {left.days}d {left.hours}h {left.minutes}m
                            </span>
                            <span className="ml-0.5 opacity-75">left</span>
                          </div>
                        </div>
                        {/* Actions */}
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            remove(item.id)
                            error()
                          }}
                          data-ignore-click
                          aria-label="Delete history item"
                          className="-mr-2"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </Frame>
                  )
                })}
              </ul>
            )}
          </section>
        </MaxContainer>
      </div>
    </section>
  )
}

function StackedCardsIllustration() {
  return (
    <div className="relative h-24 w-64" aria-hidden="true">
      {/* Back card */}
      <div className="absolute inset-x-6 top-0 h-6 rounded-t-lg border border-border/50 bg-card/60" />
      {/* Middle card */}
      <div className="absolute inset-x-3 top-3 h-6 rounded-t-lg border border-border/60 bg-card/80" />
      {/* Front card */}
      <div className="absolute inset-x-0 top-6 flex h-16 items-center gap-3 rounded-lg border border-border bg-background px-4 shadow-sm">
        <div className="size-8 shrink-0 rounded bg-secondary" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-2.5 w-3/4 rounded bg-secondary" />
          <div className="h-2 w-1/2 rounded bg-secondary/60" />
        </div>
      </div>
      {/* Fade overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-background/0 via-background/60 to-background" />
    </div>
  )
}

```

## File: apps/web/app/(routes)/(landing)/layout.tsx
```
import React from "react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export default function LandingLayout(props: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

```

## File: apps/web/app/(routes)/(landing)/page.tsx
```
import React from "react"
import { URLInput } from "@/components/url-input"
import { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <section className="flex flex-1 items-center justify-center overflow-x-clip">
      <URLInput />
    </section>
  )
}

```

## File: apps/web/app/(routes)/render/components/content.tsx
```
"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import React, { useEffect, useState, useSyncExternalStore } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useHistory } from "@/hooks/use-history"
import { MaxContainer } from "@/components/max-container"
import { Frame } from "@packmd/ui/components/reui/frame"
import {
  ClipboardText,
  Code4,
  EyeScan,
  FileText,
  Link5,
  MoreH,
  Paperclip,
  SortAlpha,
  Trash9,
  Wallpaper,
} from "reicon-react"
import { Textarea } from "@packmd/ui/components/textarea"
import { CodeBlock } from "@packmd/ui/components/code-block"
import { cn } from "@packmd/ui/lib/utils"
import { Separator } from "@packmd/ui/components/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@packmd/ui/components/dropdown-menu"
import { useRender } from "../../../../components/render-context"

// Helpers for useSyncExternalStore
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const previewTabs = [
  { key: "markdown", label: "Markdown", icon: Code4 },
  { key: "preview", label: "Preview", icon: EyeScan },
] as const

type PreviewTab = (typeof previewTabs)[number]["key"]

// Extract the first markdown heading or fall back to the URL
function extractTitle(md: string, fallback?: string): string {
  const lines = md.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("# ")) {
      return trimmed.replace(/^#\s+/, "")
    }
    if (trimmed.startsWith("## ")) {
      return trimmed.replace(/^##\s+/, "")
    }
  }
  return fallback || "Untitled"
}

export const Content: React.FC<{ id: string }> = (props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, isLoaded, getMarkdown } = useHistory()
  const { markdown: renderMarkdown, setMarkdown } = useRender()

  const [activeTab, setActiveTab] = useState<PreviewTab>("markdown")

  const [sections, setSections] = useState({
    pageInfo: true,
    source: true,
    images: true,
    links: true,
  })

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  const id = props.id || searchParams.get("id")
  const item = items.find((item) => item.id === id)

  const toggleSection = (key: keyof typeof sections) => (checked: boolean) => {
    setSections((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  useEffect(() => {
    if (id) {
      const savedMarkdown = getMarkdown(id)
      if (savedMarkdown) {
        setMarkdown(savedMarkdown)
      }
    }
  }, [id, getMarkdown, setMarkdown])

  // Process the raw markdown to strip images/links if toggled off, and sanitize unsafe/unrecognized tags
  let processedMarkdown = renderMarkdown || ""

  // Strip script tags and unrecognized lowercase React element names causing browser warnings
  processedMarkdown = processedMarkdown
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(
      /<\/?(fragment|profiler|strictmode|suspense|activity|viewtransition)\b[^>]*>/gi,
      ""
    )

  if (!sections.images) {
    // Strip markdown images: ![alt](url) -> ""
    processedMarkdown = processedMarkdown.replace(/!\[.*?\]\([^)]+\)/g, "")
    // Strip HTML images: <img ... /> -> ""
    processedMarkdown = processedMarkdown.replace(/<img[^>]*>/gi, "")
  }

  if (!sections.links) {
    // Strip markdown links while preserving anchor text: [text](url) -> "text"
    processedMarkdown = processedMarkdown.replace(
      /\[([^\]]+)\]\([^)]+\)/g,
      "$1"
    )
    // Strip HTML links while preserving text: <a href="...">text</a> -> "text"
    processedMarkdown = processedMarkdown.replace(
      /<a\b[^>]*>(.*?)<\/a>/gi,
      "$1"
    )
  }

  const pageTitle = extractTitle(renderMarkdown, item?.url)

  const markdown = [
    sections.pageInfo && `**Title:** ${pageTitle}`,

    sections.source && `**Source:** [${item?.url}](${item?.url})`,

    processedMarkdown,
  ]
    .filter(Boolean)
    .join("\n\n")

  // Graceful redirection guard with a short debounce to handle IndexedDB write lag
  useEffect(() => {
    if (!isMounted || !isLoaded) return

    if (!id) {
      router.replace("/docs")
      return
    }

    const timer = setTimeout(() => {
      const currentItem = items.find((i) => i.id === id)
      const currentMarkdown = getMarkdown(id)

      if (!currentItem && !currentMarkdown && !renderMarkdown) {
        router.replace("/docs")
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [isMounted, isLoaded, id, items, getMarkdown, renderMarkdown, router])

  if (!isMounted || !isLoaded) return null
  if (id && !item && !renderMarkdown && !getMarkdown(id)) return null

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-x-clip">
      <MaxContainer
        size="screen"
        className="flex min-h-0 flex-1 flex-col px-0 sm:px-4 sm:py-4"
      >
        <div className="flex shrink-0 gap-px bg-card/60 p-1 sm:mb-4 sm:rounded-lg sm:border lg:hidden">
          {previewTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-sm border border-transparent px-3 py-2 text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? "border-border! bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <tab.icon className="size-3" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
          <Frame
            variant="inverse"
            className={cn(
              "hidden h-full min-h-0 rounded-none sm:rounded-xl lg:block",
              {
                block: activeTab === "markdown",
              }
            )}
          >
            <div className="flex h-full flex-col overflow-hidden border shadow-sm transition-colors sm:rounded-lg">
              <div className="flex items-center justify-between border-b bg-card px-3 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">Markdown</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard
                        .readText()
                        .then((text) =>
                          setMarkdown(text + "\n\n" + (renderMarkdown || ""))
                        )
                        .catch(() => {})
                    }}
                    className="group flex items-center gap-1.5 transition-colors hover:text-primary"
                  >
                    <ClipboardText className="size-3 opacity-70 group-hover:opacity-100" />
                    <span>Paste</span>
                  </button>
                  <button
                    onClick={() => setMarkdown("")}
                    className="group flex items-center gap-1.5 transition-colors hover:text-destructive"
                  >
                    <Trash9 className="size-3 opacity-70 group-hover:opacity-100" />
                    <span>Clear</span>
                  </button>

                  <Separator orientation="vertical" className="my-auto h-2!" />

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                          <SortAlpha className="size-4 opacity-70 group-hover:opacity-100" />
                          <span>Sections</span>
                        </button>
                      }
                    />
                    <DropdownMenuContent
                      className="min-w-40"
                      align="end"
                      side="bottom"
                      sideOffset={10}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Include in Output</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                          checked={sections.pageInfo}
                          onCheckedChange={toggleSection("pageInfo")}
                        >
                          <FileText className="size-3" />
                          <span>Page Title</span>
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                          checked={sections.source}
                          onCheckedChange={toggleSection("source")}
                        >
                          <Paperclip className="size-3" />
                          <span>Source URL</span>
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <MoreH weight="Filled" className="size-3" />
                            <span>Other Options</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="min-w-30">
                              <DropdownMenuCheckboxItem
                                checked={sections.images}
                                onCheckedChange={toggleSection("images")}
                              >
                                <Wallpaper weight="Filled" className="size-3" />
                                <span>Images</span>
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={sections.links}
                                onCheckedChange={toggleSection("links")}
                              >
                                <Link5 className="size-3" />
                                <span>Links</span>
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Textarea
                value={renderMarkdown || ""}
                spellCheck={false}
                onChange={(e) => setMarkdown(e.target.value)}
                className="text-mono h-full resize-none overflow-y-auto rounded-none border-none bg-background! p-4 font-mono text-xs leading-tight shadow-none ring-0! outline-0 placeholder:opacity-50 focus-visible:ring-0 md:p-6"
                placeholder="Paste or write markdown here.."
              />
            </div>
          </Frame>

          <Frame
            variant="inverse"
            className={cn(
              "hidden h-full min-h-0 rounded-none sm:rounded-xl lg:block",
              {
                block: activeTab === "preview",
              }
            )}
          >
            <div className="flex h-full flex-col overflow-hidden border shadow-sm transition-colors sm:rounded-lg">
              <div className="flex items-center justify-between border-b bg-card px-3 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">Preview</div>
                <div className="flex items-center">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    <span>
                      ~{Math.ceil(markdown.length / 4).toLocaleString()} tokens
                    </span>
                  </p>
                  <Separator
                    orientation="vertical"
                    className="mx-2 my-auto h-2!"
                  />
                  <p className="font-mono text-[11px] text-muted-foreground">
                    <span>{markdown.length.toLocaleString()} chars</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ ...props }) => (
                      <h1
                        className="mb-2 border-b border-border pb-2 text-3xl font-bold tracking-tight text-foreground not-first:mt-6"
                        {...props}
                      />
                    ),
                    h2: ({ ...props }) => (
                      <h2
                        className="mb-2 border-b border-border pb-1 text-2xl font-semibold tracking-tight text-foreground not-first:mt-6"
                        {...props}
                      />
                    ),
                    h3: ({ ...props }) => (
                      <h3
                        className="mb-3 text-xl font-semibold tracking-tight text-foreground not-first:mt-6"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <div className="leading-6 text-foreground" {...props} />
                    ),
                    a: ({ ...props }) => (
                      <a
                        className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    img: ({ ...props }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="my-2 inline-flex max-w-full"
                        alt={props.alt || ""}
                        {...props}
                      />
                    ),
                    ul: ({ ...props }) => (
                      <ul
                        className="ml-6 list-disc text-foreground not-first:my-4 [&>li]:not-first:mt-1"
                        {...props}
                      />
                    ),
                    ol: ({ ...props }) => (
                      <ol
                        className="ml-6 list-decimal text-foreground not-first:my-4 [&>li]:not-first:mt-1"
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => (
                      <li className="text-foreground" {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote
                        className="mt-4 border-l-2 border-primary pl-4 text-foreground italic"
                        {...props}
                      />
                    ),
                    table: ({ ...props }) => (
                      <div className="my-6">
                        <Frame variant="inverse" className="rounded-xl">
                          <div className="overflow-hidden rounded-lg border bg-background">
                            <div className="overflow-x-auto">
                              <table
                                className="w-full border-collapse text-left"
                                {...props}
                              />
                            </div>
                          </div>
                        </Frame>
                      </div>
                    ),
                    thead: ({ ...props }) => (
                      <thead className="border-b bg-card" {...props} />
                    ),
                    tr: ({ ...props }) => (
                      <tr
                        className="border-b border-border/40 last:border-0"
                        {...props}
                      />
                    ),
                    th: ({ ...props }) => (
                      <th
                        className="px-4 py-2.5 text-[13px] font-medium text-muted-foreground"
                        {...props}
                      />
                    ),
                    td: ({ ...props }) => (
                      <td
                        className="px-4 py-3.5 align-top text-[13px] leading-5 text-muted-foreground"
                        {...props}
                      />
                    ),
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "")
                      const isBlock = match !== null

                      if (isBlock) {
                        const language = match[1]
                        const codeString = String(children).replace(/\n$/, "")
                        return (
                          <div className="my-5">
                            <Frame variant="inverse" className="rounded-xl">
                              <CodeBlock
                                fileName={language}
                                source={codeString}
                              />
                            </Frame>
                          </div>
                        )
                      }

                      return (
                        <code
                          className="rounded-[9px] bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground/80"
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    },
                    hr: ({ ...props }) => (
                      <hr className="my-6 border-border" {...props} />
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </Frame>
        </main>
      </MaxContainer>
    </div>
  )
}

```

## File: apps/web/app/(routes)/render/components/header.tsx
```
"use client"
import React from "react"
import { Download2, UndoCircle } from "reicon-react"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@packmd/ui/components/button"
import { MaxContainer } from "@/components/max-container"
import { Separator } from "@packmd/ui/components/separator"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import Link from "next/link"
import { CopyButton } from "@packmd/ui/components/copy-button"
import { useTiks } from "@rexa-developer/tiks/react"
import { ToggleTheme } from "@/components/toggle-theme"
import { useRender } from "../../../../components/render-context"

export const Header = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { pop } = useTiks()
  const { markdown, handleDownload } = useRender()

  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b backdrop-blur-md">
      <MaxContainer size="screen" className="py-4">
        <nav className="flex items-center">
          <div className="flex items-center">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size={isMobile ? "icon-sm" : "sm"}
              className="-ml-2"
            >
              <UndoCircle className="size-3.5" />
              <span className="sr-only md:not-sr-only">Back</span>
            </Button>

            <Separator orientation="vertical" className="mx-2 my-auto h-3" />

            <div className="flex items-center gap-0.5">
              <CopyButton
                text={`\`\`\`markdown\n${markdown}\n\`\`\``}
                label={!isMobile ? "Copy as .MD" : undefined}
                successLabel={!isMobile ? "Copied .MD" : undefined}
                className={buttonVariants({
                  size: isMobile ? "icon-sm" : "sm",
                  variant: "secondary",
                })}
              />
              <Button
                size={isMobile ? "icon-sm" : "sm"}
                variant="ghost"
                onClick={() => {
                  pop()
                  handleDownload("pack.md")
                }}
                data-ignore-click
              >
                <Download2 className="size-3.5" />
                <span className="sr-only md:not-sr-only">Download .MD</span>
              </Button>
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <Link href="/docs">
              <Button size="sm" variant="ghost">
                <span>Docs</span>
              </Button>
            </Link>

            <Link href="/history">
              <Button size="sm" variant="ghost">
                <span>History</span>
              </Button>
            </Link>

            <Separator orientation="vertical" className="mx-2 my-auto h-3" />

            <ToggleTheme />
          </div>
        </nav>
      </MaxContainer>
    </header>
  )
}

```

## File: apps/web/app/(routes)/render/layout.tsx
```
import React from "react"
import { Header } from "./components/header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "View & Edit Markdown Digest",
  description:
    "Preview, edit, and customize your generated Markdown digest. Toggle sections, copy as .MD, or download it for use in your favorite LLM.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/render",
  },
  openGraph: {
    title: "View & Edit Markdown Digest",
    description:
      "Preview, edit, and customize your generated Markdown digest. Toggle sections, copy as .MD, or download it for use in your favorite LLM.",
    url: "/render",
  },
  twitter: {
    title: "View & Edit Markdown Digest",
    description:
      "Preview, edit, and customize your generated Markdown digest. Toggle sections, copy as .MD, or download it for use in your favorite LLM.",
  },
}

export default function RenderLayout(props: LayoutProps<"/render">) {
  return (
    <div className="flex h-dvh flex-1 flex-col">
      <Header />
      {props.children}
    </div>
  )
}

```

## File: apps/web/app/(routes)/render/page.tsx
```
import React from "react"

import { redirect } from "next/navigation"
import { Content } from "./components/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/render" },
}

export default async function Render(props: PageProps<"/render">) {
  const { id } = await props.searchParams
  if (!id) redirect("/")

  return (
    <React.Suspense fallback={null}>
      <Content id={id as string} />
    </React.Suspense>
  )
}

```

## File: apps/web/app/-providers.tsx
```
"use client"
import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@packmd/ui/components/tooltip"
import { Toaster } from "@packmd/ui/components/sonner"
import ClickSpark from "@packmd/ui/components/click-spark"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"

import { defaultMarkdown } from "@/lib/constants"
import { RenderProvider } from "../components/render-context"

export const Providers: React.FC<React.PropsWithChildren> = (props) => {
  const isMobile = useIsMobile()
  const markdown = defaultMarkdown()

  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="var(--foreground)"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <RenderProvider initialMarkdown={markdown}>
          <TooltipProvider delay={0}>
            <Toaster
              richColors
              position={isMobile ? "bottom-center" : "top-center"}
            />
            {props.children}
          </TooltipProvider>
        </RenderProvider>
      </ClickSpark>
    </ThemeProvider>
  )
}

```

## File: apps/web/app/api/generate/route.ts
```
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
            const { title, content } = await scrapeWebPage(input, {
              jinaApiKey: process.env.JINA_API_KEY,
            })
            digest = `## ${title || input}\n\n${content || ""}`
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

```

## File: apps/web/app/layout.tsx
```
import "@packmd/ui/globals.css"
import { Providers } from "./-providers"
import { fontVariable } from "@/fonts"
import { Metadata } from "next"
import { siteConfig } from "@/config/site.config"
import { Analytics } from "@vercel/analytics/next"

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `${siteConfig.name} - ${siteConfig.slogan}`,
  applicationCategory: "DeveloperApplication",
  browserRequirements: "Requires modern browser",
  offers: {
    "@type": "Offer",
    price: "0",
  },
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  programmingLanguage: "TypeScript",
  codeRepository: siteConfig.links.github,
  url: siteConfig.url,
  description: siteConfig.description,
}

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: `@${siteConfig.author.username}`,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

const htmlSafeJsonStringify = (obj: unknown): string =>
  JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: htmlSafeJsonStringify(JSON_LD) }}
        />
      </head>
      <body className={fontVariable("font-sans antialiased")}>
        <Providers>{props.children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}

```

## File: apps/web/app/not-found.tsx
```
import React from "react"

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-1 flex-col items-center justify-center">
      NotFound
    </div>
  )
}

```

## File: apps/web/app/robots.ts
```
import { siteConfig } from "@/config/site.config"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

```

## File: apps/web/app/sitemap.ts
```
import { siteConfig } from "@/config/site.config"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/history", priority: 0.9 },
  { path: "/render", priority: 0.8 },
  { path: "/docs", priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }))
}

```

## File: apps/web/components/max-container.tsx
```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@packmd/ui/lib/utils"

const maxContainerVariants = cva("mx-auto w-full px-5 md:px-6", {
  variants: {
    size: {
      screen: "",
      default: "max-w-lg md:max-w-xl lg:max-w-2xl",
      lg: "max-w-4xl md:max-w-5xl lg:max-w-6xl",
      md: "max-w-xl md:max-w-2xl lg:max-w-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function MaxContainer({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof maxContainerVariants> & { asChild?: boolean }) {
  return (
    <section
      data-slot="section"
      className={cn(maxContainerVariants({ size, className }))}
      {...props}
    />
  )
}

export { MaxContainer, maxContainerVariants }

```

## File: apps/web/components/render-context.tsx
```
"use client"

import React, { createContext, useContext, useState } from "react"

interface RenderContextType {
  markdown: string
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
  handleDownload: (filename?: string) => void
}

const RenderContext = createContext<RenderContextType | null>(null)

export const RenderProvider: React.FC<{
  initialMarkdown: string
  children: React.ReactNode
}> = ({ initialMarkdown, children }) => {
  const [markdown, setMarkdown] = useState(initialMarkdown)

  const handleDownload = (filename = "pack.md") => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <RenderContext.Provider value={{ markdown, setMarkdown, handleDownload }}>
      {children}
    </RenderContext.Provider>
  )
}

export const useRender = () => {
  const context = useContext(RenderContext)
  if (!context) {
    throw new Error("useRender must be used within an RenderProvider")
  }
  return context
}

```

## File: apps/web/components/theme-provider.tsx
```
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { useTiks } from "@rexa-developer/tiks/react"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { success } = useTiks()
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
      success()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme, success])

  return null
}

export { ThemeProvider }

```

## File: apps/web/components/toggle-theme.tsx
```
"use client"

import React, { useEffect, useState } from "react"

import { Button } from "@packmd/ui/components/button"
import { Sun, Moon3 } from "reicon-react"
import { useTheme } from "next-themes"
import { useTiks } from "@rexa-developer/tiks/react"

export const ToggleTheme = () => {
  const { success } = useTiks()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-xs"
        className="-mr-2"
        aria-label="Toggle Theme"
      >
        <Sun className="size-3.5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="-mr-2"
      aria-label="Toggle Theme"
      data-ignore-click
      onClick={() => {
        setTheme(isDark ? "light" : "dark")
        success()
      }}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon3 className="size-3.5" />}
    </Button>
  )
}

```

## File: apps/web/components/typewriter.tsx
```
import React from "react"
import { motion } from "motion/react"

export const Typewriter: React.FC<{ text: string }> = (props) => {
  const [displayed, setDisplayed] = React.useState<string>("")

  React.useEffect(() => {
    let index = 0

    setDisplayed("")

    const interval = setInterval(() => {
      index++

      setDisplayed(props.text.slice(0, index))

      if (index >= props.text.length) {
        clearInterval(interval)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [props.text])

  return (
    <span>
      {displayed}

      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-0.5"
      >
        █
      </motion.span>
    </span>
  )
}

```

## File: apps/web/components/url-input.tsx
```
"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@packmd/ui/components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@packmd/ui/components/popover"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@packmd/ui/components/drawer"
import React from "react"
import { Drop, Setting2, X } from "reicon-react"
import { Controller, UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@packmd/ui/components/field"
import { resolveIcon } from "@/lib/icons"
import { Button } from "@packmd/ui/components/button"
import { cn } from "@packmd/ui/lib/utils"
import { Frame } from "@packmd/ui/components/reui/frame"
import { MaxContainer } from "./max-container"
import { useRouter } from "next/navigation"
import { useHistory } from "@/hooks/use-history"
import { useTiks } from "@rexa-developer/tiks/react"
import { Input } from "@packmd/ui/components/input"
import { Badge } from "@packmd/ui/components/badge"
import { packmdSchema, type PackmdSchemaType } from "@packmd/core"
import { useIsMobile } from "@packmd/ui/hooks/use-is-mobile"
import { sleep } from "@/lib/utils"

import { useDigest } from "@/hooks/use-digest"
import { useRender } from "@/components/render-context"

interface AdvancedOptionsProps {
  form: UseFormReturn<PackmdSchemaType>
  isPending: boolean
  includeInput: string
  setIncludeInput: (v: string) => void
  excludeInput: string
  setExcludeInput: (v: string) => void
  addInclude: (v: string) => void
  removeInclude: (v: string) => void
  addExclude: (v: string) => void
  removeExclude: (v: string) => void
  handleTagKeyDown: (
    addFn: (v: string) => void,
    current: string
  ) => (e: React.KeyboardEvent<HTMLInputElement>) => void
  error: () => void
}

const AdvancedOptions = ({
  form,
  isPending,
  includeInput,
  setIncludeInput,
  excludeInput,
  setExcludeInput,
  addInclude,
  removeInclude,
  addExclude,
  removeExclude,
  handleTagKeyDown,
  error,
}: AdvancedOptionsProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Token field */}
      <Controller
        name="token"
        control={form.control}
        disabled={isPending}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel>GitHub Token (optional)</FieldLabel>
            <Input
              {...field}
              type="password"
              placeholder="github_pat_... or ghp_..."
              disabled={isPending}
              className="rounded-[9px] font-mono text-xs"
            />
            <FieldDescription>
              Required for private repositories.
            </FieldDescription>
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="maxFileSizeKB"
          control={form.control}
          disabled={isPending}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel>Max file size (KB)</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                min={1}
                aria-invalid={fieldState.invalid}
                placeholder="500"
                disabled={isPending}
                className="rounded-[9px] font-mono text-xs"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="maxFiles"
          control={form.control}
          disabled={isPending}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel>Max total files</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                type="number"
                min={1}
                aria-invalid={fieldState.invalid}
                placeholder="500"
                disabled={isPending}
                className="rounded-[9px] font-mono text-xs"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Include patterns */}
      <Field className="gap-1">
        <FieldLabel>Include patterns</FieldLabel>
        <div
          className={cn(
            "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-[9px] border border-border bg-transparent px-2 py-1.5 text-sm dark:bg-input/30",
            "focus-within:border-ring focus-within:ring-0 focus-within:ring-ring/50",
            isPending && "pointer-events-none opacity-50"
          )}
        >
          {(form.watch("includeGlobs") || []).map((pattern) => (
            <Badge
              key={pattern}
              variant="secondary"
              className="flex h-4.5 items-center"
            >
              {pattern}
              <button
                type="button"
                onClick={() => {
                  removeInclude(pattern)
                  error()
                }}
                data-ignore-click
                className="rounded-full hover:bg-muted-foreground/20 disabled:pointer-events-none disabled:opacity-50"
                aria-label={`Remove ${pattern}`}
                disabled={isPending}
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyDown={handleTagKeyDown(addInclude, includeInput)}
            placeholder={
              (form.watch("includeGlobs") || []).length === 0
                ? "*.ts, *.tsx, *.md  (empty = all)"
                : "Add pattern..."
            }
            className="flex-1 border-none bg-transparent p-0 font-mono text-xs outline-0 placeholder:text-muted-foreground"
            disabled={isPending}
          />
        </div>
      </Field>

      {/* Exclude patterns */}
      <Field className="gap-1">
        <FieldLabel>Exclude patterns</FieldLabel>
        <div
          className={cn(
            "flex min-h-8 w-full flex-wrap items-center gap-1 rounded-[9px] border border-border bg-transparent px-2 py-1.5 text-sm dark:bg-input/30",
            "focus-within:border-ring focus-within:ring-0 focus-within:ring-ring/50",
            isPending && "pointer-events-none opacity-50"
          )}
        >
          {(form.watch("excludeGlobs") || []).map((pattern) => (
            <Badge
              key={pattern}
              variant="secondary"
              className="flex h-4.5 items-center"
            >
              {pattern}
              <button
                type="button"
                onClick={() => {
                  removeExclude(pattern)
                  error()
                }}
                data-ignore-click
                className="rounded-full hover:bg-muted-foreground/20 disabled:pointer-events-none disabled:opacity-50"
                aria-label={`Remove ${pattern}`}
                disabled={isPending}
              >
                <X className="size-2.5" />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={handleTagKeyDown(addExclude, excludeInput)}
            placeholder={
              (form.watch("excludeGlobs") || []).length === 0
                ? "node_modules/**, .git/**"
                : "Add pattern..."
            }
            className="flex-1 border-none bg-transparent p-0 font-mono text-xs outline-0 placeholder:text-muted-foreground"
            disabled={isPending}
          />
        </div>
      </Field>
    </div>
  )
}

export const URLInput = () => {
  const router = useRouter()
  const { add } = useHistory()
  const { pop, success, error } = useTiks()
  const [isPending, startTransition] = React.useTransition()
  const isMobile = useIsMobile()
  const { setMarkdown } = useRender()
  const { generate } = useDigest()

  const form = useForm<PackmdSchemaType>({
    resolver: zodResolver(packmdSchema),
    defaultValues: {
      url: "",
      maxFileSizeKB: "100",
      maxFiles: "200",
      token: "",
      includeGlobs: [],
      excludeGlobs: [],
    },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const url = form.watch("url")
  const isGitHub = url.includes("github.com")

  const LeftIcon = React.useMemo(() => resolveIcon(url), [url])
  const [preset, setPreset] = React.useState<string | null>(null)
  const [openGithubMenu, setOpenGithubMenu] = React.useState<boolean>(false)

  // ---- Tag input states ----
  const [includeInput, setIncludeInput] = React.useState("")
  const [excludeInput, setExcludeInput] = React.useState("")

  // ---- Helper to update globs in form ----
  const addInclude = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const current = form.getValues("includeGlobs") || []
    if (current.includes(trimmed)) return
    form.setValue("includeGlobs", [...current, trimmed], { shouldDirty: true })
    setIncludeInput("")
  }

  const removeInclude = (pattern: string) => {
    const current = form.getValues("includeGlobs") || []
    form.setValue(
      "includeGlobs",
      current.filter((g) => g !== pattern),
      { shouldDirty: true }
    )
  }

  const addExclude = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    const current = form.getValues("excludeGlobs") || []
    if (current.includes(trimmed)) return
    form.setValue("excludeGlobs", [...current, trimmed], { shouldDirty: true })
    setExcludeInput("")
  }

  const removeExclude = (pattern: string) => {
    const current = form.getValues("excludeGlobs") || []
    form.setValue(
      "excludeGlobs",
      current.filter((g) => g !== pattern),
      { shouldDirty: true }
    )
  }

  const handleTagKeyDown =
    (addFn: (v: string) => void, current: string) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addFn(current)
      }
      if (e.key === "Backspace" && current === "") {
        const globs =
          addFn === addInclude
            ? form.getValues("includeGlobs")
            : form.getValues("excludeGlobs")
        if (globs && globs.length > 0) {
          const newGlobs = globs.slice(0, -1)
          if (addFn === addInclude) {
            form.setValue("includeGlobs", newGlobs, { shouldDirty: true })
          } else {
            form.setValue("excludeGlobs", newGlobs, { shouldDirty: true })
          }
        }
      }
    }

  const selectPreset = (url: string) => {
    form.setValue("url", url, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setPreset(url)
  }

  React.useEffect(() => {
    if (url !== preset) {
      setPreset(null)
    }
  }, [url, preset])

  async function onSubmit(data: PackmdSchemaType) {
    startTransition(async () => {
      try {
        toast.loading("Generating Markdown. Please wait..", {
          id: "generating",
        })

        // Subscribe to store changes to dynamically update the toast with live progress messages
        const unsubscribe = useDigest.subscribe((state) => {
          if (state.progress) {
            toast.loading(state.progress, { id: "generating" })
          }
        })

        await generate(data.url, {
          maxFileSizeKB: Number(data.maxFileSizeKB),
          maxFiles: Number(data.maxFiles),
          includeGlobs: data.includeGlobs,
          excludeGlobs: data.excludeGlobs,
          token: data.token,
        })

        // Clean up the subscription once generation finishes
        unsubscribe()

        // After generation, check store for result
        const state = useDigest.getState()
        if (state.data?.digest) {
          toast.dismiss("generating")
          toast.success("Markdown generated successfully.")
          success()
          const id = await add(data.url, state.data.digest)
          setMarkdown(state.data.digest)
          await sleep()
          router.push(`/render?id=${id}`)
          pop()
          form.reset()
        } else if (state.error) {
          throw new Error(state.error)
        }
      } catch (err) {
        toast.dismiss()
        toast.error(
          err instanceof Error ? err.message : "Failed to generate markdown",
          {
            duration: Infinity,
            closeButton: true,
          }
        )
        console.error(err)
        error()
      }
    })
  }

  const triggerButton = (
    <Button
      size="xs"
      variant="secondary"
      disabled={isPending || !isGitHub}
      onClick={(e) => {
        pop()
        e.stopPropagation()
        setOpenGithubMenu((prev) => !prev)
      }}
    >
      <Setting2 className="size-3" />
      <span>Advanced</span>
    </Button>
  )

  const optionsProps: AdvancedOptionsProps = {
    form,
    isPending,
    includeInput,
    setIncludeInput,
    excludeInput,
    setExcludeInput,
    addInclude,
    removeInclude,
    addExclude,
    removeExclude,
    handleTagKeyDown,
    error,
  }

  return (
    <MaxContainer className="py-18">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center sm:mb-10"
      >
        <FieldGroup>
          <Controller
            name="url"
            control={form.control}
            disabled={isPending}
            render={({ field, fieldState }) => {
              const submitVariant = isPending
                ? "outline"
                : field.value.length > 0
                  ? "default"
                  : "secondary"

              return (
                <Field data-invalid={fieldState.invalid}>
                  <Frame
                    variant="inverse"
                    className={cn(
                      "rounded-3xl!",
                      fieldState.invalid ? "glow-error" : "glow-pulse",
                      "has-[[data-slot=input-group-control]:focus-visible]:[--glow-opacity:0.1]"
                    )}
                  >
                    <InputGroup className="relative bg-card!">
                      <span className="absolute top-3 left-4">
                        <LeftIcon className="size-3.5 animate-pulse text-muted-foreground" />
                      </span>
                      {!isPending && field.value.trim().length > 0 && (
                        <span
                          onClick={() => {
                            form.reset()
                            error()
                          }}
                          role="button"
                          data-ignore-click
                          className="cup absolute top-3 right-4"
                        >
                          <X className="size-3.5 text-muted-foreground" />
                        </span>
                      )}
                      <InputGroupInput
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        placeholder="Paste GitHub repo Web URL"
                        disabled={isPending}
                        className="px-10 pt-3 pb-4"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupAddon>
                          {isMobile ? (
                            <Drawer
                              open={openGithubMenu}
                              onOpenChange={setOpenGithubMenu}
                            >
                              <DrawerTrigger render={triggerButton} />
                              {isGitHub && (
                                <DrawerContent className="p-4 pb-6">
                                  <DrawerHeader className="px-0 pt-0 text-left">
                                    <DrawerTitle>Advanced Options</DrawerTitle>
                                  </DrawerHeader>
                                  <div className="mt-2">
                                    <AdvancedOptions {...optionsProps} />
                                  </div>
                                </DrawerContent>
                              )}
                            </Drawer>
                          ) : (
                            <Popover
                              open={openGithubMenu}
                              onOpenChange={setOpenGithubMenu}
                            >
                              <PopoverTrigger render={triggerButton} />
                              {isGitHub && (
                                <PopoverContent
                                  align="start"
                                  onClick={(e) => e.stopPropagation()}
                                  className="max-w-md min-w-72 p-4"
                                >
                                  <AdvancedOptions {...optionsProps} />
                                </PopoverContent>
                              )}
                            </Popover>
                          )}
                        </InputGroupAddon>

                        <InputGroupButton
                          type="submit"
                          variant={submitVariant}
                          size="icon-sm"
                          isLoading={isPending}
                          disabled={fieldState.invalid || !field.value.length}
                          className="ml-auto rounded-full"
                        >
                          <Drop size="3.5" />
                          <span className="sr-only">Send</span>
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Frame>
                  <div className="mx-auto flex items-center justify-center px-2 text-center">
                    {fieldState.invalid ? (
                      <FieldError
                        className="text-xs sm:text-sm"
                        errors={[fieldState.error]}
                      />
                    ) : (
                      <FieldDescription className="text-xs sm:text-sm">
                        {isGitHub
                          ? "Customize options to include or exclude specific files."
                          : "Add a GitHub repository to unlock advanced options."}
                      </FieldDescription>
                    )}
                  </div>
                </Field>
              )
            }}
          />
        </FieldGroup>

        <div className="mt-3 flex items-center gap-1 md:mt-4">
          {[
            {
              label: "Wikipedia",
              url: "https://en.wikipedia.org/wiki/Next.js",
            },
            {
              label: "PackMD",
              url: "https://github.com/thelastofinusa/packmd",
            },
            {
              label: "React Docs",
              url: "https://react.dev/reference/react",
            },
          ].map(({ label, url }) => {
            const Icon = resolveIcon(label)

            return (
              <Button
                key={url}
                type="button"
                size={isMobile ? "xs" : "sm"}
                variant={preset === url ? "outline" : "secondary"}
                disabled={preset === url || isPending}
                onClick={() => selectPreset(url)}
              >
                <Icon className={isMobile ? "size-3" : "size-3.5"} />
                <span>{label}</span>
              </Button>
            )
          })}
        </div>
      </form>
    </MaxContainer>
  )
}

```

## File: apps/web/components.json
```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@packmd/ui/lib/utils",
    "ui": "@packmd/ui/components"
  },
  "rtl": false,
  "menuColor": "default",
  "menuAccent": "subtle"
}
```

## File: apps/web/config/site.config.ts
```
export const siteConfig = {
  name: "PackMD",
  slogan: "LLM-ready code in one click",
  title: "PackMD — Turn Git Repos & Web Pages into LLM-Ready Markdown",
  description:
    "PackMD converts any GitHub repository or web page into clean, structured Markdown digests optimized for ChatGPT, Claude, and local LLMs.",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://packmd.vercel.app",
  author: {
    name: "Holiday",
    url: "https://github.com/thelastofinusa",
    username: "thelastofinusa",
  },
  links: {
    github: "https://github.com/thelastofinusa/packmd",
    twitter: "https://x.com/thelastofinusa",
  },
  keywords: [
    "PackMD",
    "GitHub to Markdown",
    "Web to Markdown",
    "LLM Context Generator",
    "Codebase Ingestion",
    "Claude Prompting",
    "ChatGPT Context Window",
    "Developer Tools",
  ],
} as const

export type SiteConfig = typeof siteConfig

```

## File: apps/web/eslint.config.js
```
import { nextJsConfig } from "@packmd/eslint-config/next-js"

/** @type {import("eslint").Linter.Config} */
export default nextJsConfig

```

## File: apps/web/fonts/index.ts
```
import { cn } from "@packmd/ui/lib/utils"
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google"

const fontSans = Bricolage_Grotesque({
  subsets: ["latin"],
  preload: true,
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  preload: true,
  variable: "--font-mono",
})

export const fontVariable = (className?: string) =>
  cn(fontSans.variable, fontMono.variable, className)

```

## File: apps/web/hooks/use-digest.ts
```
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

```

## File: apps/web/hooks/use-history.ts
```
"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { get, set, del } from "idb-keyval"

const STORAGE_KEY = "packmd-url-history"
const HISTORY_TTL = 7 * 24 * 60 * 60 * 1000
export const TOTAL_DAYS = Math.floor(HISTORY_TTL / (1000 * 60 * 60 * 24))

export type HistoryItem = {
  id: string
  url: string
  markdown: string
  createdAt: number
  expiresAt: number
}

export function useHistory() {
  const [now, setNow] = useState(Date.now())
  const [items, setItems] = useState<HistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load history from IndexedDB on initial client mount
  useEffect(() => {
    if (typeof window === "undefined") return

    get<HistoryItem[]>(STORAGE_KEY)
      .then((stored) => {
        if (stored && Array.isArray(stored)) {
          const currentTime = Date.now()
          // Filter out expired items on load
          const valid = stored.filter((item) => item.expiresAt > currentTime)
          setItems(valid)
          if (valid.length !== stored.length) {
            set(STORAGE_KEY, valid)
          }
        }
      })
      .catch(() => {
        setItems([])
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const save = useCallback(async (value: HistoryItem[]) => {
    setItems(value)
    try {
      await set(STORAGE_KEY, value)
    } catch (err) {
      console.error("Failed to save history to IndexedDB", err)
    }
  }, [])

  const cleanup = useCallback(async () => {
    if (!isLoaded) return
    const currentTime = Date.now()
    const valid = items.filter((item) => item.expiresAt > currentTime)
    if (valid.length !== items.length) {
      await save(valid)
    }
  }, [items, isLoaded, save])

  useEffect(() => {
    if (isLoaded) {
      cleanup()
    }
  }, [now, cleanup, isLoaded])

  const add = useCallback(
    async (url: string, markdown: string) => {
      const id = crypto.randomUUID()
      const currentTime = Date.now()

      const item: HistoryItem = {
        id,
        url,
        markdown,
        createdAt: currentTime,
        expiresAt: currentTime + HISTORY_TTL,
      }

      const updated = [item, ...items.filter((i) => i.url !== url)]
      await save(updated)

      return id
    },
    [items, save]
  )

  const remove = useCallback(
    async (id: string) => {
      await save(items.filter((item) => item.id !== id))
    },
    [items, save]
  )

  const clear = useCallback(async () => {
    setItems([])
    try {
      await del(STORAGE_KEY)
    } catch (err) {
      console.error("Failed to clear history from IndexedDB", err)
    }
  }, [])

  const getMarkdown = useCallback(
    (id: string): string | undefined => {
      const item = items.find((i) => i.id === id)
      return item?.markdown
    },
    [items]
  )

  const getTimeLeft = useCallback(
    (expiresAt: number) => {
      const remaining = Math.max(0, expiresAt - now)

      const days = Math.floor(remaining / 86_400_000)
      const hours = Math.floor((remaining / 3_600_000) % 24)
      const minutes = Math.floor((remaining / 60_000) % 60)
      const seconds = Math.floor((remaining / 1000) % 60)

      return {
        days,
        hours,
        minutes,
        seconds,
        ms: remaining,
        expired: remaining === 0,
      }
    },
    [now]
  )

  return {
    items: useMemo(() => items, [items]),
    isLoaded,
    add,
    remove,
    clear,
    getMarkdown,
    getTimeLeft,
  }
}

```

## File: apps/web/hooks/use-url-store.ts
```
"use client"

import { useCallback } from "react"

const STORAGE_KEY = "packmd-url-store"
const TTL = 30 * 60 * 1000 // 30 minutes

export type StoredUrl = {
  id: string
  url: string
  expiresAt: number
}

export function useUrlStore() {
  const save = useCallback((url: string) => {
    const id = crypto.randomUUID()

    const items: StoredUrl[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    )

    const now = Date.now()

    const next = [
      ...items.filter((item) => item.expiresAt > now),
      {
        id,
        url,
        expiresAt: now + TTL,
      },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))

    return id
  }, [])

  const get = useCallback((id: string) => {
    const items: StoredUrl[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    )

    const item = items.find(
      (item) => item.id === id && item.expiresAt > Date.now()
    )

    return item?.url ?? null
  }, [])

  const remove = useCallback((id: string) => {
    const items: StoredUrl[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]"
    )

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.filter((item) => item.id !== id))
    )
  }, [])

  return {
    save,
    get,
    remove,
  }
}

```

## File: apps/web/lib/constants.ts
```
export const SOCIALS = [
  {
    platform: "𝕏",
    name: "Holiday",
    username: "@thelastofinusa",
    url: "https://x.com/thelastofinusa",
  },
  {
    platform: "GitHub",
    name: "PackMD",
    username: "@thelastofinusa",
    url: "https://github.com/thelastofinusa/packmd",
  },
]

export const defaultMarkdown = () => {
  return `# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your \`web\` app:

\`\`\`bash
bunx shadcn@latest add button -c packages/ui
\`\`\`

This will place the ui components in the \`packages/ui/src/components\` directory.

## Using components

To use the components in your app, import them from the \`ui\` package.

\`\`\`tsx
import { Button } from "@packmd/ui/components/button";
\`\`\`
`
}

```

## File: apps/web/lib/icons.ts
```
import type { IconType } from "react-icons"
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6"
import { BsWikipedia } from "react-icons/bs"
import { TbBrandNextjs } from "react-icons/tb"
import { RiLink, RiReactjsFill, RiVercelFill } from "react-icons/ri"
import { Drop } from "reicon-react"

type IconMatcher = {
  keywords: string[]
  icon: IconType
}

const DEFAULT_ICONS: IconMatcher[] = [
  {
    keywords: ["github", "github.com", "gist.github.com"],
    icon: FaGithub,
  },
  {
    keywords: ["react"],
    icon: RiReactjsFill,
  },
  {
    keywords: ["packmd", "pack-md"],
    icon: Drop,
  },
  {
    keywords: ["facebook", "facebook.com"],
    icon: FaFacebook,
  },
  {
    keywords: ["instagram", "instagram.com"],
    icon: FaInstagram,
  },
  {
    keywords: ["linkedin", "linkedin.com"],
    icon: FaLinkedin,
  },
  {
    keywords: ["wikipedia", "wikipedia.org"],
    icon: BsWikipedia,
  },
  {
    keywords: ["twitter", "twitter.com", "x.com"],
    icon: FaXTwitter,
  },
  {
    keywords: ["vercel", "vercel.com", "vercel.app"],
    icon: RiVercelFill,
  },
  {
    keywords: ["next.js", "nextjs"],
    icon: TbBrandNextjs,
  },
]

export function resolveIcon(value: string): IconType {
  const input = value.toLowerCase()

  const match = [...DEFAULT_ICONS].find(({ keywords }) =>
    keywords.some((keyword) => input.includes(keyword.toLowerCase()))
  )

  return match?.icon ?? RiLink
}

```

## File: apps/web/lib/utils.ts
```
export async function sleep(duration = 1000, name = "Timer"): Promise<void> {
  await new Promise((resolve) => setTimeout(() => resolve({ name }), duration))
}

```

## File: apps/web/lib/zod.ts
```
import * as z from "zod"

const normalizeUrl = (value: string) => {
  const trimmed = value.trim()
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

// Accepts strings or numbers, allows empty inputs, validates positive numbers
const optionalNumericString = z
  .union([z.string(), z.number()])
  .optional()
  .refine(
    (val) => {
      if (val === undefined || val === null || val === "") return true
      const num = Number(val)
      return !isNaN(num) && num >= 1
    },
    { message: "Must be a valid number (at least 1)" }
  )

export const formSchema = z.object({
  url: z
    .url("Please enter a valid GitHub repository or website URL.")
    .trim()
    .min(1, "Please enter a valid GitHub repository or website URL.")
    .transform(normalizeUrl)
    .pipe(z.url("Please enter a valid GitHub repository or website URL.")),
  maxFileSizeKB: optionalNumericString,
  maxFiles: optionalNumericString,
  token: z.string().optional(),
  includeGlobs: z.array(z.string()),
  excludeGlobs: z.array(z.string()),
})

export type FormSchemaType = z.infer<typeof formSchema>

```

## File: apps/web/next.config.ts
```
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@packmd/ui"],
}

export default nextConfig

```

## File: apps/web/package.json
```
{
  "name": "web",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write \"**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf node_modules .turbo .next"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@packmd/core": "^1.0.0",
    "@packmd/ui": "workspace:*",
    "@rexa-developer/tiks": "^0.3.0",
    "@vercel/analytics": "^2.0.1",
    "@vercel/og": "^0.11.1",
    "class-variance-authority": "^0.7.1",
    "idb-keyval": "^6.3.0",
    "motion": "^12.42.2",
    "next": "16.2.6",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.82.0",
    "react-icons": "^5.7.0",
    "react-markdown": "^10.1.0",
    "rehype-raw": "^7.0.0",
    "reicon-react": "^1.1.302",
    "remark-gfm": "^4.0.1",
    "sonner": "^2.0.7",
    "web-haptics": "^0.0.6",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@packmd/eslint-config": "workspace:^",
    "@packmd/tsconfig": "workspace:*",
    "eslint": "^9",
    "typescript": "^5"
  }
}
```

## File: apps/web/postcss.config.mjs
```
export { default } from "@packmd/ui/postcss.config"

```

## File: apps/web/public/apple-touch-icon.png
```
�PNG

   IHDR   �   �   =�2   	pHYs     ��   sRGB ���   gAMA  ���a   tEXtSoftware Figma���c  
IDATx��qKėW|7D D`g`2��D`20D`"�����#�S�K��v�n���\����Ck���έv��A'��p�-\!CW���2�p�-\!CW���2�p�-\!CW���2�p�-\!CW���2�p�-\!CW���2�p�-\!CW���2�p�-\!CW���2�p�-\!CW���2�p�-\!CW������'O���/_V?�?�?�?�������ׯJ߿��N��	�zrr���+#��]����ӧ��˗�E[��v��~��y;4�����Tע0Q;�v�x{~~����ގ�ϟ?+c�2>�5*@T�΢)��dl<���,�`'����,Fn2�J�$Q;�P#�D���v�P�k9�����������͛�:h�������	ib�^�w�ީ+� ͻol�de�%�P��ۣ����=��WWW۾�iU��滸����6�e`��a�o߾m���K���*����A#����C�ӷ��l�NH%�`7O��XF�/�$]�S���q-U��	���f�����R�k]�h�8U��7*����۬y!�.`�s�;����V3����K�^�����R3��~���&�&S��*��J53&��]�ɩڅ��*�^J53[��K	� SS�YX��jf�>nS�V+���U��_씏e�X)�^Ng��!\�������"�d.v3��RL�k�a�Q���E?c��(s>|�Pi�	f��qr��fU�IJ��Q3��Ճ��{�'�㻉T�&��S�9eAє��S�N�i�`M�d�!�d�.;�2KC�ʓ)c�HT�F�Rj`M���u��Ԇ�PVLu=
U��J)50Q��,;���U
a��QS�*d�C��]����z=�uA��z�9�zPۨ�zq��u�)�R�7�S�α�{$Q�(k"8D����%.p���4U��X��-5���.;Mi�9��T�>���sg�)��v˱���֋�,M�Yf��s~�]7��z)DY�*�;���܌��̵�޴�,M쭬�snv�k=���4y_�*�[Y}��<�z�)e���w���U��]j��w׬Z�1�瞨��dMs��VxXzi}s�xrHl%���ɞSܤ)AVR��Ƴ'�`+�L��$����6D�-\".;��53K�d�����b�Zx�eU�f��7�Z���bxLc��T�F����ΎV��Q��`|S����O���Z���k�~g����
y�Ǐ�����:�@e蘙�f�	}8;;�>~yy�b]3뚗��q�v��Y4�{q�T�7
8g<�="������5�u��������J"�Ae��b�`��3����wbs�X)75t�(a�쎿_����1"��M)�1��g������vK:&ͺY�t�,��I��_�xQՋ�H�]^�tMX���,�T4�����/���X׎�䠩�c����Xu44��e	:�X�Gz�f�l�}ppX�j۵qssD���1��g�Z���b<�>}Xp��Ÿ��b&dh�
C{���J��`�t���L��R��E�&�4����gDzd�q�-͵֌������-/Khm}�Mut����#��fW��JV2)	�:V�����}ֺ�Aն�-�?>>��kǔ������Sc�F5n24899	��5c�Z������TvtǺf�߳,�+�M�6�.��Rem��x��Z���\�OOO�H�*7>~��zz�*s)��6�3{�
�R�� ^7'R�nI�͆j<{�
6��P��5���3�*�[-���4���3�*�[Y��*K��*��O��
�V��`7���Z�Y�T�ޑ��s���&�:���z�*�;J��TcS�D�ɞ�T�>�u*X�VTcCV����Kl��I��Rv�o�n}��w6�El���t��-��n:n�	Gox�`[e�<��mɺ�L�El����ӘrdM��R�U�Q�ԊK1u����-��5��))\]]���1&k�\���U�I�n��x;�cI)����y_T�&+e�X���B&�!��rnf�*�NZ���T��ϩ�V%�k�4��
�����G0��Y9�Ǽ 3CT��Rj�Q�Aɵ5bä�13Dlo�NK66bIi���y�|_T�f)e!S���8�S[q�`��1��L�
6[)k������ܘ��90�K�\4��4J���aQ`��]]V�U�vp�NN��?��o��K��v1���}�.//î̠�5t(i�lJ�k��Y:Ls[f��s����~��r��!��8C�x�3a,	�%��n�793;�P[w�Y�B�-�D��b0622z�2r����L0�c���g
кCN�E�=)L]����ի��r���\�d/�#�J��8h���pУ0�V �����f���[2� ���0yہ�8j�>]�n��y���t;�C�����+dh�
Z�B�����+dh�
Z�B�����+dh�
Z�B�����+dh�
Z�B�����+dh�
Z�B�����+dh�
Z�B�����+dh�
Z�B�����+dh�
Z�B�����+dh��+a�t?68s    IEND�B`�
```

## File: apps/web/public/favicon.svg
```
<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="192" height="192" rx="96" fill="black"/>
<path d="M94.4375 69.6824C96.3998 68.7751 97.2546 66.449 96.3471 64.487C95.44 62.525 93.114 61.6699 91.1518 62.5773C80.8975 67.3193 72.9942 76.7485 69.3829 88.1584C68.7305 90.2193 69.8724 92.419 71.9334 93.0713C73.9943 93.7236 76.1937 92.5818 76.846 90.5209C79.86 80.9985 86.3719 73.4123 94.4375 69.6824Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M108.45 42.3964C100.471 39.0658 91.5286 39.0658 83.55 42.3964C60.2689 52.1149 45.1172 75.2379 45.1172 100.844V102.225C45.1172 129.688 66.908 152.102 93.9725 152.102H98.0275C125.092 152.102 146.883 129.688 146.883 102.225V100.844C146.883 75.2379 131.731 52.1149 108.45 42.3964ZM86.5655 49.6204C92.6146 47.0953 99.3854 47.0953 105.434 49.6204C125.727 58.0914 139.055 78.3157 139.055 100.844V102.225C139.055 125.531 120.604 144.273 98.0275 144.273H93.9725C71.3962 144.273 52.9453 125.531 52.9453 102.225V100.844C52.9453 78.3157 66.2727 58.0914 86.5655 49.6204Z" fill="white"/>
</svg>

```

## File: apps/web/public/icon-192.png
```
�PNG

   IHDR   �   �   R�l   	pHYs     ��   sRGB ���   gAMA  ���a   tEXtSoftware Figma���c  �IDATx�1z��������6�9#��͜-uB��:G�CR' o0�̎F<�`�ّ�l3o01��th ]���%Q����F�OP\qT*i�����C�ϻx؈�_�n�~������-�1�P��FG:��F_7_?Ci�:��i�cTF���v���4�Y��Ry�B��Je��XQvB�?/�,�����R<�$J���STF/�x]k�i���eBf��{�6b[d��Q��H0�)��� ��_@{����As�$�0ǥ2�#� A��$�:��u���j�S(GUXP&b�0fjCp�e�;�͔b �(��E�����:�0	tK�2�h�Ɨ���Sz�X��YR�j�.���Z�@+<!)��D֜AC��g�B9�d=TU{]@���ǥ4/�N��cT���#W����ۋh���1�V3S��^B�@���|��j�Qy��9���m���!px�>�*t�3b�sE9̨��X!P�+�	�C��Q�1F��%P{8���7�zH�Ưt�	Ȑ#@��'P��P��2��A�_�O�ʖ�O��R�����o���@
Yug���1�s�Uܯ���8��t Mz�1X�aR�2�W��C����?����+��?�X��K����F�f꒙�f899�����+>I���������믷�������Nޖ��$ЗZ��4�"M�b�X߾}+����g�3%���$	< ���De�^\^^:1�}�y^dYV�#���PKLL
Y�\e�S,��bl��ْ�j M�E{��C���9���G�B���3�m�΢��`�ω<4Z`dN!��Z�����Š1�x���աf�@�2h��&�X�,{ؽ��6��I�V����g��|��~��]l%�U��R!�W��볲��WWW�2�M��j���iq}}������{��֎4��$�$�!�1@��]Ti�t���"�O�3 E�z��}�X��g>���҈��
���^��c  E���i��EG����m�vQ��g �PE㽻�+����qv="���AH��1	�"T� چ4$fb�\{$yA�d ��ŀ|��ۆE8�� (BT[��eu(��	�	�U�2 Ehjk,��K���y��k��@����b��(`'�=
� �����Yޔ���n;��6	tָ�r�@�lK���m�m#��,�DGf ��d;�ZH��	�,��0�;�7�h���8A��&Z�D�8s������e�ʗi�)^ro�>�{;�u2���������Cg�8����s��.��c���&10)Nт%0��:�m�?D�g�����&��X>��%	0��:�\Ǽt&�j�� �{�!��'� ��B{�6�ᬩ˟k�l����L�F63Ɓ�BVs.��lB>\W?�F·��2�o��D@��H�������Jz��(%>���Iq U!c5(��Nlzb��q��O����,��p�4�2O.��XU1�*��b����f��W 	��I�;�.��l҅vY{�1�1�(�c�G�I6eOe�P�%��
2
������ڻ���{�2����?�Ԕ2
�����k%��M^�ݵ���'���E� F��y����z��A��6	v����(�d�����ؒMݿo(b�����f`vx+�y|����4�0d��c�fp5�2�N��\�g�[��}�X�9�L�
D����ֺ �	�M�۷W�	}���Q���dx+^z~�{e
M�&l6s-ؒ���z%��Z����M�s���������dr~�am~͑��A����O�¦�-�i�&��೾xv�!noo��qu���:�}��U: B�m����7�g�9�hx�������ܠ+|��C�>~���1�gz����%P�*E����N�˷�bn�u�`�S��rrrr��칺�?��˚��C�O؆�Q��,<Fnd�=�|���>�����5b�Ԗ��%�r|||��}�>;;�P�-��
N���B1%�C�O���4uF�䐕���4�ތ�%�}.ӄ��D89�b���{����:���9�65�Ⱦ"�
T�6��'&|�o߾]'�5t�>D��6������M����`j��v�q��ׯ�	����gVY:�65uJ��v q��o�$���>L 9ǫW�����^�|	��t ��"R�1�:x�:�{L 4�� R{Ʉ� �6��yPPb�!�@Ql���(q��H�:�#�'B���]��5�6� _E� �֤}&й����x8j������d%�4S�bz_�S�t �c
�\.A��I����؂_��S�
L���~	A/3�R��G�6��R����ՠ�^����}0�0�l�CyGd�#���kXA����w-�
S[J���K� �!ӻ����7����yʖ׊;$�t4j��1T�lv�zBΚz` 'jc`�L;<+fLmhz���֛���L���6�U̘���<e����5�Y��aPw��L"􌰝Ú���"8�|2����Qp�=�]�Q6'��(�^��M;B�\�p�+�.�J6U
�����خB�?0��"[�t����d��3<�tO,k1wj�M2|yy)Ꞧ�)�'��6����Z�Q�������)dS�a[K���n`�9���ֲ?��d
}���),Y�lF���sQ�4�l_��?���%0�Ŷ���M4��vB+?�-HL}��t���Zz�MՇ�m%��3�h��jEöy��<�&t�iЖ[� nR��MBL�4�uؐ����z��(��&"L�$ݗK�$�Dx�C�Б%�B�8\���Y=�����/x���"�j1�3���	���O�=�ײ�H�9GE�e5�����o�r8`��,N~�°)�^��lCB�
�?
P���p�^��GA�P0 �8BlI��6N@I�0�ۖ94�I !��H��Lj�T�\(BP[' �-��
��h3���g����$���� W�&�9�"qUh�0�����1Ƨ�v5|�C�+c3H��h�]�f�X��}����?�ro�{��9�"4u�v�Z;'�h�K�T�h��~?��h���_
:GK~B7r��ic�c�ʞq�m��䞦����?|� u;s�R�13��Z�ጫ��8	������;(��¢����"x�-��c�#\__�"2|*Ǆ����mDc�=4be��Nd�;���%d5Xo�v�˨�ޞol	ޫ��2��k�I�j��(�g�	�<D��h�NStOcd�S��hEǆU�_��G@��/����%L~���uI�mY�%����_i��#�w�֧�.�~� &GP��:Lz�¥p�g(�@Q�cU�T;�ƥ������i�+8�Op/��`VN�������,��eEq�GTy��^*�U�U]� M4)V\��ä�9/0���JԬP�� �O�jheHi�
#t�C� 5+��Jp�V�b��a�����9	��GY�4Dt���(f������Jp�qė�R�̘!P��&u�0���t��z)�{��-DIu���C'J�	"U5��0еC�h��v2���j�9����`��5I�S*	4/I94�oc� �&�\W�x�)t4�(�<���	:�,-�!� ����g��w�_���:�(������$D��@&�C.�c	Iw�P� ��Ec��;�@aHe���#�{�+��$A�9d�/�?��:��B�FKT�5�@��t���0g%�å��?l��)�����!��V{�%4�Qp��՞�R�{�r<�7j�Ϙj_ I$��형z�����:���7�=Y�Ѝ*GHJo~?v�Jæ�A�����W5�����4�?���R��w���O�j��q�����Η����R    IEND�B`�
```

## File: apps/web/public/icon-512.png
```
�PNG

   IHDR         �x��   	pHYs     ��   sRGB ���   gAMA  ���a   tEXtSoftware Figma���c  1�IDATx��=|Y���?��# sF�9Cd�M��F���'�#�l7R�:BDw3��v���7�&��9S�������t��iZR��9u�s~���?���P����s^� xP5��j���ë���_�{Z���Q/|��*���¯�,�����>�z��K�������h���K�w� Q  �UM��}�o�yp�J[���B[\@0 @w*}�/|_� �+jͻ��@( �͵-�����v,m�`" �  ng�@��=!EmQ�~�{ נ  ~dw�6�?����;{��N���� Jg����/W_���[;]�( J�x�?~�ڂ��XG��P ��~�֧���L��`�F�-�����S�uԚoDw � @.lз��@��{�V`��݁Z�s ��������L��3Pp� �0�#5Q�!
 x��/&��b�!G���^}eNޜi�f�\@�( ��v������Z���K1E��P  ��Q���"@"( Ч���P���,6�[@W �� @l���0Ѽ+p& "
 �b�-�cnX�k dd��m�)!d휊Upj�d,_������kd  i�ڷ��|}��z.E!��� ]`~���|��D���( �~���ވB [� �6��4Ԣ��( �	~ M�(�!
 ����� �D��0�>՚/<p
 \g����jQ� X6�|��2 �(�� �A�c� g�&���h�Jg-~������@�SO�TB�� �����������=��n �Eb
�Lq `���DP�J�  �љ�@-�)�rX���� �̦���gZ� t �7�~ ���<or!d�] �Z\�_	 �W5� n��@�lu/�� ��-�Ut�C�����&n����Y7ъ����&_�,P ���c{�Y� ��� ��������~ a���o�F���@\t2@��U����H���� �8���ؚ -��O�n������U�� Ra�Ië�9E�	: >T�/�� ��n�T<S y��>��g'r1����3�HHS 鲖�� �c�Y�j^ؔ�?��0��J�� ��HS �i[�� ��JL	$�)�t����vJ�>��MHS i��* e�Ŕ@���@��P�J<�<	L��}�- %��P ��~���ɟ ��u�a@|����E�X@\6���_	 ��E@T,��@� ש4_�/D��8�����~ p����W߳800
����,�������X����|�@ �m�7����s aTb�? t���� �^%�@�jQt�] ݲ;~ �V��g+]����@��} B�� �	�vF�� �>c���aglܝ=�� �b�}m�wak ��~�E ��~��ʁA[� ؞�# �2��J�
��0�@W_)6D�9 H���+E�( 6�� i\}�X��� m���k� X�? �0��Jp
��1��/���7� ��? �4��Jp
��1��o���+P �f��r� �7��D�3{�g�@>����G��#{�� rd��3<�;�� �����V���_	 ��Z�N@��Q 0�@ijQ_ ��|ο �$�_T��� ��� Jdkު`%o|�d( @�*�;����Z �) �t��Z�i�% �� �wxPPi� +���  ��b@[x�B����|��? `���(�R!J� \�� ���=������ ��l{�+��E��� l��!���@<� �����sP�3� ۳u O��3r. X� �U��s]`8~  ���M�Y�cp�d$  �a�g�(0�)�J�� �^v�r* lз��  ݫ5/�X����j�� ��F3�� � 6��a? �вY��@%�� �d� ��������﫪�Y��6�޽{߾o}��E_�~�����������D���|�s�+j���==~������}W�B�����g_/.�yt:��}h�9�0��� 6���`o_m�O���dV��V q�� �@%��G��.~6��W+ <��
�w��;2}���r�5�kp�d( 36��C={�lv��+޼y3�Jw �:o�\n�dJH.i�����t<OsgƦ����=�F���}9�P��?2aw�v�ow�]/������[g �@֏N��|U��������uyy9�
xz	�&c!��|� �-6�O?�<�jV���N��r����#�S���x� d����٠���
�8��4u�N����f~�6(�ӌ�N��'��?+����g�w�RS��?q�8�G�� R��S�z�Ia����?>
�$�� l�:��B��b��_�z5E�(������+)�;����PGGGEޓ"{���ɉ^�|) Au�G�ڎ��#�����H
��3R�R� T���I���6��lΓ;{$����y�R��1�w��c	���>|`�w�
��0{��<Bٳ��S%�J�P��JP���}�}�V���������������YW �Y����6`��J@O�����;��ؓm� ��Y���T X�$�'��4e���V�[��׾~��������̋y����ﭥ��3[`� �#ۮ2RR) *��N�D������d�����9���ӵ"���F�?�����:� �̪�GW_!N�#=����ݓ����9::��;�߶ݽ}���5d� �9�x����d;��Q/l�=99�=s �kj�m�ݵ��8I����0k�{y�H���� e���]�<��t����~x� �!cn(_/q����i�l��F�.��k�*vw�����cWזd��
v)_/qO���>�w���
�S$b>�PC�z��Ӥ���}�_�z�<=�� ���
t)_/q��[��/@�?{ʅ S$R>k~Tp1���gIy�?+�Lʅ��W�\]K�6#�w�$`l@����45���n)6%��F��.��|�0�Ql�6������wM�� �H����J���@I�T?�B0�o������9�ٲ�=]C�*�w���!Nb�R�@�mR;G�Ł$`F�T%��I��B�T�q�9��ZR�� ��m�X�^�xRZ��<�X!�J7��i��#2Rf*q�O:�}�ҟv?�k��z�d� �8�u��� 	'��@����� �i�	� )���'%��������"A� �q����D����]�?}?h�"�t��2p)_�$����}���'� �a�w��u�I��{��8~^6�y� �H�]���&���s�����f����"�t�K95��MK��?-�<��vA� �Qrh,_�$�>>��Y�g�$���ٓ�LJ�؜�g�5�׶���ȩ|]\�H샺���V�{�Vd���K�N��$;䭜�������6Gl��x�Nd���.�"��[O�뢒D�ǃ}��Wf��f��qO׉$������J�=^56�f�N_E �&[&�����uAI�c�K,}=U�"�l��6���Iz����46{���kD§��
�Ͼ�kD��X����B��c-�؋��t8O׈�K������EJЩ|]D�c��e��-�� ֡�-r����[���"�{ޕ�����E�=����!�'�ŀC����Ǽz�j�?�4�� {Ox�>��$����|]<�S�11��m���Sd����J�.�)6��?�51� �c���ݩ|]4�Cb/�+}���,.�&1� {�p>Y3#%�R�.�!1��-u��뼼���}����<)%f`O-�tmHo�ŀ�ڗ�FzH̓�J��o2Z��¶��c?[������zt*�DL�y��N��d�_vpp��ϚJb��z �fz{L�}��h$Bl.3ּIg�[+���J�yb>;�� d��v&�P>/��X��Kik��o��t��2��<1[� k��3��{�H�X{:�pB-����sW�7�-+�J�/	����ϓ��I���\�v��Sd�D����"k�_�+�mp��L�>�3[�-�:0��F$V�?�A+�Is~~�����X����]]5cER���"���뼵]��OI4��y�N)&F�Ʀ��
 7$�4�PҔ���h���/�\�M��ӵJ1�v�+�ܐ(� cISBc��r�m���>Y���5K5�n#FǮ rM�
��4%d91�~r[�gF�$]�5 �%Ƣ@v�t`(iJ�bb,Z��O�����_f7=]���`vn�k2T@o%M	i����xb���.N�6���+�ϒ����1��������;�0�y��8ő�H�g$M	ic�.T����\r��X��@�"p*iJH��Z.��R�i!�O�EY�p)iJ�%�¿\�Tkk�&l����u��3�C�r���I�b�qG�Ö������o���;Ƹ	=�	�dEl��̑�)!��'�尸��T0����S�H��驀cISBbl��ޞNe�g�O'1���!�C^��$pB��{��La�g�O3���Ķ@��ζ$M		}��}���!����M�=�-�,d��H��������j+���O?��@��v��������|���ݛ�����w{�B�$W��{'�%M		����4}��]��X��`�@��:�}ISRvB��{}]���=���~�	}6 �!����[c��������؝c�$��Gi� W�i ���'���w���B^�[l��:����F�h�u ����w�^�R��ٵ��_Bv����l�` iJ�M����<6[5�������D[�0�4%�&�ݿ�m},��Io����l
�#і� �R��Ѥ�p��sb/��>�l���5�Ht�s��z�>N�4�I����kyr||��,���~����uB��������::���p�g���^� ![����c<�ewl��//�� ��	��E�u ��ִ��| )ow�vմ����?}�TBYBwbu����&��|U7�Ä���v���իi����] ��Sm��
M�!o+�m^,,�#��;(0��Fy���r럧���[�8ڗ�	y. [J��Z���CIO	5蝟���!�E|(�儚�cK`�Ykm�Q�����ly{:�<�i�dUBvx>@�Yk?(O ,4��<�=�/F�EY䦄z/�sWtN�d�6��Bql�_��B/_��v�O�-�-��e� �y��B���mD�֚�,_U� ������m�͓�d�~�Bn��Շ�Yd��������U��:<<T��D^���#�x;�١P�_�V���P$�p�n��嫢!$��/w�1����ld�X �(66����zX���{��===UHv�֫�uY Tm_(R������z��Bu�y�����J�3���D�i����H7��\XB�y���/��?]�mr1 g��f
�p�Z�^��|���]X�(T'�'�Z��b��_������?$k��8??W�(ҵ;��� ;&��w/���O���O�J�i*Τ(2�ھt 
���?�t+�{�� E��o��M�!�Jೳ3�.����/t%�{*� �V��ͷ��� ;$�!#>|p����c��p�������E�ۢ: �*�����t�������߫kv���P�ogP *T�����P�=0֪��������U�ᩅAvL�U�V��<������&!S���t�Y�v ����X ������b���#�w�ީk�>����� <� %�����`����-ԡ@�
X���rw�(C��B>��+6��N���`���T��T�: 
Q�X��5�����6��T��� �1��5��5��3�|�w��%D��:��ܳ��(L�=�J���������0!��v��z��c���������@��T�����g{R_�g��Pw7�_�[�i �s � ���!��S�| O!�n� ���(·���.8�A0Ա�^{���꺱�(� �|�1�g{�S. B������?��� �8���E�OP������C-lJ}�#���3ɢ (I��^����'�}
Q|��(L�$D{/� !5Y��Ã����7k ��"�B�z P����HA����Ũ�
E����K!>$����{/D��B�r�(D���O�������L`� "��^/a�w���#%!���
e��W� %� h���t�����!%!ރ�(�: �Q xy��]<���<�)	� �)�b�	<n2%������<]�h4�n�������������*c�(@���ǅp� �q'��/^���o���J�P�"pP	B��S��w�=z��I~v���'Ofk�T� ��'!{!��?~�Wv�4gŀ�y��s��l:L_�~�}��b?�E�b' � �@P�P��zg���B��
X*@�3 X�!�{���B��� t �|���( J@ �] ����"c�i�/�;w �Ǳ: ����_��$;�G���� J��Ul� s�����mP d�)  v�U׸y�@�B��C�<`{!� ( �G�9��@�( �
���   ��mX��96B  �Q d� �m��^�@�( ����h��|Q   P 
   ���
�Z  �$_�   P vd��< �U� ��i$�g  V`   %b   ��D s� X�@�B<'��* \c   �    
�s   (   b
 w!v�HK��d��HʷE�t2�6@ ��#k�� q�0��ѕÆj����_ ?!���  ��3?��C���5=|�P ���@�f<��\�*�����E9@�.�/Ld.D@ �@�~����5 @Z����5� d���ܹ����|�4�Nյ;w�@x�cCO�L�  D%϶# ��c?��"f+�\^� �1%G��o��ݥ�D�>~���� ������7����%� �|�x/^\0d�۹?wW�&�B ������S Y��o��M�%D5�C��X���7 ��< �_��>d
 k�^\� �v� �O��`��$�ۋ���U�T��� �W�� w��[�0���[Y ��_~Q�B|V ?Tw� �|�B�� bC?��[. ��dj2��k���@?B����ڍ�Z�R���. ЏPkpB�, 7 �~��U�,����3u����Ջ�X�`'@�޿����p;v `C6���0���on� ��{.D�&��i XU � S������ �Pko� d���}U�O@�l!`��X�b��>( �V/�ƪ`"d�ݻw�Z��H \/D��@�[k
���·��� ��Z� ���Y�,�ƪ৕��G�79� �8����|q�^��ʔ��8(ԇ���1����
 ~2b � @x�������r�u�D���Bu�B� )+o����?�ܤ��&�ݭ_^^v��ȶ>x�@ °�m���oClF�]��|���� �
�\ ��p��������k?�o* X��P-���c�^����7o��]{��MS �&c!Kv����g�@;���[�?�G�{\8��T׬�c
�P6@�Zxtt$ �	5�f����j
��2j���P �jj���l��{S`x6d���������`��f��n�o+ &B�BN��F�����0��oR ����
�: t��؝����"Ln��� ��\�=�< �M�N�����D2n��7� �u ��?ԝ��]�xl)P����P���ֱ{���Dg.�s��l'�:�PSHʭ�wt;������x<2�h;h������<�ǎ�䉐�[��u: �(@�3l
�. ������:d��S�o��z����i��m�h\]B���WBi�
���:k�u��0!k֢ug`] � ����bL����YкlR	�
�� ���S>�����7<��u�G����v L�Ib$ú !w� n���+�b����0Q ��![d0LC����AH���iH��)&`� ?K���3������ձ�F(���t-���hw�) ���˗
��8G�� |g�c���gB�����'��"[&d�m��|O�m����2T@�%MI�	��%B�9==��ĺ��R)���)�?!� f��� ��^�G�]TƊ�SI�.�M�	���	!]�Z�!��ڊ�P0PPBw޾}��z�UB������z��S)���)�?�(���#Wׄ�]��o��/*cE�4@A999��Į RRb����/.CE�4@A	�����H)����4$+.(��K�-lr�";h"!�[�� �9�@
�����=�d�U��/�D� E�4@a	ݶ4�Y&�ƶ���Q�Ef��l��z[�a= �11��gk�{�V>/�2ggg��l���HN�1���Ȝ�G��`d��Xh^�z��r]�g94��}��i��b��c8>>vu]Y���`�
x�.��\*#��h���>!�upp���&Ƣ?��bs�؞/�tk7Ƙ
�����=W׆�������_l*%b,_�t�XS�oO����p�v�+!�	PhbMP�9������(4��E I91�E������_�D�."�(1jqF I1�3���E��/:�J�@�."�0����"���؃�h4ru}H穔��|]H�ab~R�{����3V��}�u��z����Ɂ1���㱚yP}��=��t��=���ӧBђcYXxb�h�XEb'悿�)>�r`$_�t����"��L�?��D�.�[f] /��۷o�1�2'�б��؃���<]#,���1���G�����h��P��R�:�e�!�9��o��� �Ujx� �:��귈�-��8+M;4��L$�CQ��3�=]'�f��ێ܍��`�����@�.2	;���A�]b?;1��/�?�������M%֓�Y�� �il;k�+Ê��K9�Sɷ����ud���Q_��R�r�����`J���و�x�U��R.���|]t8gggӾX[��U������Z��������2@���>� c+�������?Y�K9:��6#���$B�.lJ�n@�����0��k2RF����0v�*݀r��]�a�'��R���F��"�HI�0��;v����}��rCF�] rm����i�<cgA�q,�*��'7�R���F��b��I�06X�a0���9����o1��[2R����R`�-�3�����ܒKe|���׋B"��g܄B�GR�9{����
@��{Z*s���`j ��8���~d�\�����H�^�C�;�"��`�]]�Iu�7=M6�P�@֊mݲ}��jw�A�g"��|ױ�Y���t]Io�T����"�����U���6��<���3T�>��EzLJ{�ob���HY�~w��������~F=]_�{.գ;�נ�X���V��9��W...���;���Ͼ��A_������{m�?���l��&g*� �Wi$����L��� �?����X��C�g��,2�O��X=�`��-�C5�a7݀e��D�߿�}���,�L�|�˷�������~���Yw�£&�z�B`N�
ؐ�͝���WygE����(�Vr.S��@�����`�u�_d�������3����J� �O�˫��Ǝ��f� ��2h�N��Ǐ�����^J��@���`o���kb���˗j���T7y����M*�59�%l�9v7�vaQ[�����ۯ�f�Baqz�r˽{���� �[�
w���K%r�oJ��.@%`�� -���C��s�I����Q��n�[�<x0kC�:;;ӟ����i"�M�YܓZ�؎����t�M��&��|��?�t��-����Jk�ܲ�G�1w��X���'O�0��k/��Ԧ ���At�!�p������������@��¦F���<��t�H���y1��c���#|��)�4�9���-�-پO/4q
��0�9U�R�0��h�ț��߼y�?b��ȉ�I� 0v��[����=��탾٪�ׯ_��I��dd/�G�z( �X�
@dv��=d�S��]v�ow������󿊗�j�AL�'v��1��@�l��������G�j%��oy) �Q�Wz�>�����a������>�|�� 0L V�c��={�Ad�g�Z����v?��39h��� ��
@��`S�p��@��ow�����ZNZ�-o�aW ��N�z���X;�=����9��s��oy, � ��"�v��������[k�9}8q&G������ l*���m-�"���� ��+Q{�������π�j9k��� f���@�5+l���ZQ�	9����>}�}���>2a��Dy. �=+�P@f����-�׏?����u�ν������om=w�Ȕ=�w$�� Ʀ�XEq���~�"�޽{��ׯ_�ۻv��v`o������P Tbk   �x�����?�?{!��_ @xi�79�C`���A�?
 �p�4/ ��a
���@ @H���,��T �J�  t/�y�E�L�X  !�y�E� ��  �.�������m
�eS vJ �  vQ��~���U�l*�2Y� �E��Q�Yʵ 0��E   ۰'���T�k �M��E� ���9�g�X���E�6�z  �:l�ߟ��\.cQ  `�2]��,�5 ��E��  X�VƋ����hY�:� X��I�)a������5�  ������b�V ��; 0_��W���L�q� �BV��R��e�`  @��U��q� l�2՚/�+���R�^�� P�Z��~E?/��@�ҼP	 ��Z���V�( ��  ț����!P ,h^  �cs��WJ_�l��� y��v���p��� ��*��P �f�ArZ  �g�����
��MD  ���?V� ��D ���-( n7E  x��
��LD  0���`}Q @��7@���(  E�� ��D ��-P lg"�  H���( �7E  �� ���c��v�/'��`wvl�&� �`��l��8���i�(�� ���sͻ����=E�i�Z ��՚�N�N��^�y'� ��������� �Bw5
�0�&O�� �����a@8�h�<h�G 6��o��" 
���&�M�?�b`<vN���& ױm~v�ϙ@\��!  �Ԛ���� ��E  ,�A��Z��] ��Mi�� J�F���� ���@ ���~[��J�0п��+@8�? i�ĺ  e`�?�HC-� ȟ}�1ߟ� ���|���� ��Z�i2���`
 M�� ��Z��'�)�4՚?L� �/k��gY-$�)�tY�̞&Ȕ  oh�;���� ����`
��Z�]/ ��� ��  i���.�q�5 ��M�5y�dO �/[���&�Gp��'[`co�O�� q���o�OM���!
 �l��  �M4������t ��n���W��1
�|� �D���	Y� ��  ]k���"���B�'� �`���P�!;��?+ ފs ������I���ʝS��Z��Ya�!kL�c���� ��D�E~�B( ��"A �j����ΟE~� (�M��[R�B (���]<��X e���@������/� Ъ4��@ r5Ѽ�?��. ��&O5��S@Nl���U&D �69� ��<��&g�P �6CQ ���o��'be?��"@ܦ=V���1 ��]�og���� l�Ҽ#p :@J����( ��J@
��5
 �� �~� ]�4??�ł@X� �5lr�dJ�,�M��"\ ����C���2�spʞ1p&_�����b�G`�@,U�Q�_�:`�� �0�|��@ &M�49?"� @�*ͻ���&���vП� R`����
 ͏�>w�� RS���K;�ow�A����{g ������D@�( �S�b"Z�p� �T�H�D�p� �U�@?&bЇs �E�y���+�
�%�m���
 �j���C�&��j��������
 J`�#�{w X��˷A"��!s (�@�]��Jf��{q��Q �t�V`p
�����*�( �#+�)�� `A�OmK����~B �nOߋ�ǢK��}�'b� ����@��E��8�.�֏�}-�P  �i��x�{lgy�o��`g @xmw�-^}�D�������|p��@G ��-�ku����������|]��m{�' ����Ły��ϴ�F+��mځ{Q���}Z�{�~�$��	�I\�Ǖ�    IEND�B`�
```

## File: apps/web/public/llms.txt
```
# PackMD - Turn Code into LLM-Ready Markdown

**PackMD** is a powerful, open-source tool that converts any GitHub repository, local directory, or web page into a clean, token-efficient Markdown digest. It's designed to be the fastest way to feed codebases and web content into AI models like ChatGPT, Claude, and Gemini for analysis, documentation, or context building.

- **Website:** [https://packmd.vercel.app](https://packmd.vercel.app)
- **GitHub:** [https://github.com/thelastofinusa/packmd](https://github.com/thelastofinusa/packmd)
- **License:** MIT

---

## Key Features

*   **One-Click Generation:** Paste a GitHub URL or webpage link and get a Markdown digest in seconds via the web app.
*   **Token Efficiency:** Strips noise, respects `.gitignore`, and formats content to minimize token usage for LLMs.
*   **Web App Interface:**
    *   **Home:** Input URL, advanced options (max files, size, glob patterns), and real-time progress streaming.
    *   **History:** All digests are saved locally in your browser's IndexedDB for 7 days. Reopen or delete entries as needed.
    *   **Render:** Edit and preview generated Markdown with a split view, section toggles (title, source, images, links), copy, and download.
*   **Command-Line Interface (CLI):** For scripting and automation, run `packmd` from your terminal.
*   **Shared Core:** A single, robust engine (`@packmd/core`) powers both the web app and the CLI for consistent and reliable parsing.

---

## Quick Start (Web App)

1.  Go to [https://packmd.vercel.app](https://packmd.vercel.app).
2.  Paste a GitHub repository URL (e.g., `https://github.com/vercel/next.js`) or any webpage URL.
3.  (Optional) Configure advanced options like max files, file size limits, or glob patterns.
4.  Click **Generate** to begin the process.
5.  Preview, edit, and copy/download the generated Markdown from the Render page.
6.  Find all your past digests in the History page.

---

## Quick Start (CLI)

**Install globally:**
```bash
npm install -g packmd
```

**Usage Examples:**
```bash
# Generate a digest from a GitHub repo
packmd https://github.com/vercel/next.js -o next.md

# Scrape a webpage (requires Jina API key for higher limits)
packmd https://react.dev --jina-api-key YOUR_KEY --copy

# Digest the current directory (respects .gitignore)
packmd .

# Use advanced options
packmd facebook/react --max-files 300 --exclude "*.test.js"
```

For all options, see the [CLI Documentation](https://packmd.vercel.app/docs).

---

## Project Architecture

PackMD is a monorepo built with **Next.js** for the web app and **Node.js** for the CLI, powered by a shared core package.

- **`@packmd/core`**: The engine. It handles fetching GitHub repos and web pages, filtering files, building directory trees, and generating clean Markdown.
- **Web App (`apps/web`)**: An interactive Next.js application with a modern UI built using **shadcn/ui** and **Tailwind CSS**.
- **CLI (`packages/cli`)**: A Node.js command-line tool that uses the same core engine for scripting and automation.
- **UI Package (`@packmd/ui`)**: A shared component library for the web app.

---

## Core Components & API

### GitHub Fetcher
The core logic intelligently parses any GitHub URL, including those with branches, subdirectories, or single files.
```typescript
import { fetchGithubRepo } from "@packmd/core";

const result = await fetchGithubRepo("https://github.com/owner/repo/tree/branch/subdir", {
  token: "ghp_...", // For private repos
  maxFiles: 100,
  maxFileSizeKB: 50,
  excludeGlobs: ["**/*.test.ts"],
});
```

### Web Scraper
Uses the Jina Reader API to convert any public web page into clean Markdown.
```typescript
import { scrapeWebPage } from "@packmd/core";

const { title, content } = await scrapeWebPage("https://react.dev", {
  jinaApiKey: "jina_...", // Optional, for higher rate limits
});
```

### Markdown Generator
Builds a file tree and generates the final, token-efficient Markdown digest.
```typescript
import { buildFileTree, generateMarkdown } from "@packmd/core";

const tree = buildFileTree(files);
const markdown = generateMarkdown(tree, { showTree: true });
```

---

## Tech Stack

- **Web App:** Next.js (React), Tailwind CSS, shadcn/ui, Zustand, Next-Themes, Vercel Analytics.
- **CLI:** Node.js, Commander, Inquirer, Ora, Picocolors.
- **Core:** TypeScript, Zod for validation, built with Tsup.

---

## Why PackMD?

- **Supercharge AI Workflows:** Quickly turn codebases into context for LLMs without writing scripts.
- **Save Time and Tokens:** No more manual file opening and copying. Get a clean, structured digest instantly.
- **Open Source & Free:** MIT licensed and completely free to use.
- **Privacy-First:** The web app stores your history locally in your browser, not on a server.

---

## SEO & Contributing

### SEO
PackMD's web app is designed with SEO in mind, featuring static generation, a clear site structure, and optimized Open Graph metadata.

### Contributing
Contributions are welcome! Please visit the [GitHub repository](https://github.com/thelastofinusa/packmd) to get started.

```

## File: apps/web/public/logo-icon.svg
```
<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="192" height="192" rx="96" fill="black"/>
<path d="M94.4375 69.6824C96.3998 68.7751 97.2546 66.449 96.3471 64.487C95.44 62.525 93.114 61.6699 91.1518 62.5773C80.8975 67.3193 72.9942 76.7485 69.3829 88.1584C68.7305 90.2193 69.8724 92.419 71.9334 93.0713C73.9943 93.7236 76.1937 92.5818 76.846 90.5209C79.86 80.9985 86.3719 73.4123 94.4375 69.6824Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M108.45 42.3964C100.471 39.0658 91.5286 39.0658 83.55 42.3964C60.2689 52.1149 45.1172 75.2379 45.1172 100.844V102.225C45.1172 129.688 66.908 152.102 93.9725 152.102H98.0275C125.092 152.102 146.883 129.688 146.883 102.225V100.844C146.883 75.2379 131.731 52.1149 108.45 42.3964ZM86.5655 49.6204C92.6146 47.0953 99.3854 47.0953 105.434 49.6204C125.727 58.0914 139.055 78.3157 139.055 100.844V102.225C139.055 125.531 120.604 144.273 98.0275 144.273H93.9725C71.3962 144.273 52.9453 125.531 52.9453 102.225V100.844C52.9453 78.3157 66.2727 58.0914 86.5655 49.6204Z" fill="white"/>
</svg>

```

## File: apps/web/public/sitemap.webmanifest
```
{
    "name": "PackMD",
    "short_name": "PackMD",
    "description": "PackMD converts any GitHub repository or web page into clean, structured Markdown digests optimized for ChatGPT, Claude, and local LLMs.",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0a0a0a",
    "theme_color": "#0a0a0a",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        },
        {
            "src": "/favicon.svg",
            "sizes": "any",
            "type": "image/svg+xml"
        }
    ]
}
```

## File: apps/web/tsconfig.json
```
{
  "extends": "@packmd/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@packmd/ui/*": ["../../packages/ui/src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "next.config.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mts",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}

```

## File: package.json
```
{
  "name": "packmd-monorepo",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "turbo format",
    "typecheck": "turbo typecheck",
    "clean": "turbo clean"
  },
  "devDependencies": {
    "@packmd/core": "^1.0.0",
    "@packmd/eslint-config": "workspace:*",
    "@packmd/tsconfig": "workspace:*",
    "prettier": "^3.8.3",
    "prettier-plugin-tailwindcss": "^0.8.0",
    "turbo": "^2.9.18",
    "typescript": "^5"
  },
  "packageManager": "bun@1.3.13",
  "engines": {
    "node": ">=20"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

## File: packages/cli/.npmignore
```
src/
tsconfig.json
tsup.config.ts
.gitignore
!dist/
!dist/**
node_modules
.turbo
```

## File: packages/cli/README.md
```
## packmd

**PackMD** is a command‑line tool that converts any GitHub repository, local directory, or web page into a clean, token‑efficient Markdown digest – ready to paste into ChatGPT, Claude, or any LLM.

### Installation

**Global (recommended)**

```bash
npm install -g packmd
```

Now you can use `packmd` from anywhere:

```bash
packmd --help
```

**Run without installing (using npx)**

```bash
npx packmd <target> [options]
```

**From source (monorepo)**

```bash
git clone https://github.com/thelastofinusa/packmd.git
cd packmd
bun install
cd packages/cli
bun run build
# run locally
node dist/index.js <target> [options]
```

### Quick Start

```bash
# Generate a digest from a public GitHub repo
packmd https://github.com/vercel/next.js -o next.md

# Scrape a documentation website (requires Jina API key for higher limits)
packmd https://react.dev --jina-api-key YOUR_KEY --copy

# Digest the current directory (respects .gitignore)
packmd .

# Digest a local folder with custom options
packmd ~/projects/my-app -m 300 -s 50 --exclude "*.test.js"
```

### Usage

```
packmd [target] [options]
```

| Argument | Description                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target` | GitHub URL (e.g., `https://github.com/owner/repo`), owner/repo slug, local directory path, or any webpage URL. Defaults to current directory (`.`). |

**Options**

| Flag                          | Description                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| `-o, --output <path>`         | Save the generated Markdown to a specific file (e.g., `digest.md`).                        |
| `-c, --copy`                  | Copy the output directly to your clipboard (no file saved).                                |
| `-t, --token <token>`         | GitHub Personal Access Token for private repositories or higher rate limits.               |
| `-m, --max-files <number>`    | Maximum number of files to include (default: `200`).                                       |
| `-s, --max-file-size <kb>`    | Maximum file size in KB (files larger are skipped) (default: `100`).                       |
| `-i, --include <patterns...>` | Glob patterns to explicitly include (e.g., `"*.ts" "*.md"`).                               |
| `-e, --exclude <patterns...>` | Glob patterns to explicitly ignore (e.g., `"test/**" "*.log"`).                            |
| `--jina-api-key <key>`        | Jina Reader API key – raises the free rate limit from 20 to 500 requests per minute.       |
| `--no-gitignore`              | Ignore `.gitignore` rules when scanning a local directory (by default they are respected). |
| `-v, --version`               | Show the version number.                                                                   |
| `-h, --help`                  | Show help.                                                                                 |

> **Note:** When using `--output`, if the file already exists, you will be prompted to overwrite or enter a new name.

### Examples

**GitHub repository**

```bash
# Basic
packmd facebook/react -o react.md

# With token (for private repos)
packmd my-org/private-repo -t ghp_xxxxx -o private.md

# Limit to 300 files, exclude everything in the "examples" folder
packmd vercel/next.js -m 300 -e "examples/**" -o next-limited.md
```

**Web page (via Jina Reader)**

```bash
# Simple scrape
packmd https://docs.nestjs.com --copy

# With Jina API key (higher rate limit)
packmd https://tailwindcss.com/docs --jina-api-key jina_xxxxx -o tailwind.md
```

**Local directory**

```bash
# Digest the current folder
packmd .

# Digest a specific path
packmd ~/code/my-project -o project.md

# Override .gitignore and include only TypeScript files
packmd ./src --no-gitignore -i "*.ts" "*.tsx"
```

**Combine options**

```bash
packmd https://github.com/expressjs/express -o express.md -m 100 -s 50 -e "test/**" "*.spec.js"
```

### How It Works

The CLI uses the same core engine (`@packmd/core`) as the web app:

1. **Input detection** – determines if the target is a GitHub repo, a web page, or a local path.
2. **Fetching** – for GitHub, uses the GitHub API; for web pages, uses Jina Reader; for local, uses Node.js `fs`.
3. **Filtering** – applies ignore rules, globs, size limits, and binary detection.
4. **Processing** – builds a directory tree and downloads file contents (in parallel for GitHub).
5. **Markdown generation** – creates a header with metadata, an ASCII tree, and fenced code blocks for each file.

Progress is shown via a live spinner (`ora`). Output can be saved to a file or copied to your clipboard.

### Notes

- **GitHub rate limits** – Without a token, you are limited to 60 requests per hour. Use `-t` to raise this to 5,000 per hour.
- **Jina rate limits** – Without an API key, you get 20 requests per minute. Provide `--jina-api-key` for 500 RPM.
- The CLI respects `.gitignore` by default. Use `--no-gitignore` to scan everything.
- **Binary files** (images, fonts, archives) are automatically skipped.

---

### License

MIT © [Holiday](https://github.com/thelastofinusa)

```

## File: packages/cli/package.json
```
{
    "name": "packmd",
    "description": "Convert GitHub repositories and webpages into AI-ready Markdown digests",
    "version": "1.0.0",
    "license": "MIT",
    "type": "module",
    "bin": {
        "packmd": "./dist/index.js"
    },
    "files": [
        "dist",
        "README.md",
        "LICENSE"
    ],
    "scripts": {
        "build": "tsup",
        "start": "tsx src/index.js",
        "start:node": "node dist/index.js",
        "clean": "rm -rf dist node_modules .turbo",
        "prepublishOnly": "bun run build",
        "pushout": "npm publish",
        "pushout-inc": "npm version patch --no-git-tag-version && bun run pushout"
    },
    "devDependencies": {
        "@types/inquirer": "^9.0.10",
        "@types/node": "^26.1.1",
        "tsup": "^8.5.1",
        "tsx": "^4.23.1",
        "typescript": "^5"
    },
    "dependencies": {
        "chalk": "^5.6.2",
        "clipboardy": "^5.3.2",
        "commander": "^15.0.0",
        "ignore": "^7.0.6",
        "inquirer": "^14.0.2",
        "minimatch": "^10.2.5",
        "ora": "^9.4.1",
        "@packmd/core": "^1.0.0",
        "picocolors": "^1.1.1"
    },
    "keywords": [
        "packmd",
        "markdown",
        "github",
        "llm",
        "codebase",
        "digest",
        "cli",
        "generator",
        "scraper",
        "developer-tools",
        "chatgpt",
        "claude"
    ],
    "author": "Holiday (https://github.com/thelastofinusa)",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/thelastofinusa/packmd.git",
        "directory": "packages/cli"
    },
    "bugs": {
        "url": "https://github.com/thelastofinusa/packmd/issues"
    },
    "homepage": "https://packmd.vercel.app/docs"
}
```

## File: packages/cli/src/actions/run.ts
```
import color from "picocolors"
import clipboard from "clipboardy"
import fs from "node:fs/promises"
import inquirer from "inquirer"
import ora from "ora"
import { name, version } from "../../package.json"
import { checkForUpdate, printUpdateNotice } from "../utils/version-check"
import { handleGitHub, handleLocalDir, handleWebpage } from "../handlers"
import { promptGithubOptions } from "../prompts/github"

export async function runAction(target: string, options: any) {
  console.log(color.cyan(`${name} — AI Markdown Packager`))

  const updateCheck = checkForUpdate(version).catch(() => null)
  let finalOptions = { ...options }

  try {
    let digest = ""
    const spinner = ora()

    if (target.startsWith("http://") || target.startsWith("https://")) {
      const targetUrl = new URL(target)
      const isGitHub = targetUrl.hostname.includes("github.com")

      if (isGitHub) {
        // Trigger the smart inquirer prompt
        finalOptions = await promptGithubOptions(finalOptions)
        spinner.start("Fetching repository. Please wait..")
        digest = await handleGitHub(target, finalOptions, spinner)
      } else {
        spinner.start("Scraping webpage. Please wait..")
        digest = await handleWebpage(target, finalOptions)
      }
    } else {
      spinner.start("Scanning local directory. Please wait..")
      digest = await handleLocalDir(target, finalOptions, spinner)
    }

    // Output Handling
    let outputPath = finalOptions.copy ? null : finalOptions.output || "pack.md"

    if (outputPath) {
      let finalPath = outputPath

      // Loop to ensure we get a valid, safe path if the user declines overwriting
      while (true) {
        let fileExists = false
        try {
          await fs.access(finalPath)
          fileExists = true
        } catch {
          // File does not exist, which is what we want
          fileExists = false
        }

        if (fileExists) {
          const { overwrite } = await inquirer.prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: `File ${color.cyan(finalPath)} already exists. Overwrite?`,
              default: false,
            },
          ])

          if (overwrite) {
            break // User confirmed overwrite, exit loop
          } else {
            const { newFileName } = await inquirer.prompt([
              {
                type: "input",
                name: "newFileName",
                message: "Please enter a new file name:",
                default: "pack-new.md",
                validate: (val) =>
                  val.trim().length > 0 || "File name cannot be empty.",
              },
            ])
            finalPath = newFileName // Update path and check again on the next iteration
          }
        } else {
          break // File doesn't exist, safe to write
        }
      }

      // Write the file
      await fs.writeFile(finalPath, digest, { encoding: "utf-8", flag: "w" })
      spinner.succeed("Markdown generated successfully!")
    }

    if (finalOptions.copy) {
      await clipboard.write(digest)
      spinner.succeed("Markdown compiled successfully.")
    }

    const latestVersion = await updateCheck
    if (latestVersion) printUpdateNotice(version, latestVersion)
  } catch (error: any) {
    console.error(
      color.red(`\n✖ ${error.message || "An unexpected error occurred"}`)
    )
    process.exit(1)
  }
}

```

## File: packages/cli/src/handlers/github.ts
```
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

```

## File: packages/cli/src/handlers/index.ts
```
export { handleGitHub } from "./github"
export { handleLocalDir } from "./local"
export { handleWebpage } from "./webpage"

```

## File: packages/cli/src/handlers/local.ts
```
import path from "node:path"
import { DEFAULT_IGNORES, buildDigestHeader } from "@packmd/core"
import { walkLocalDir } from "../utils/fs"
import { loadGitignore } from "../utils/gitignore"
import type { Ora } from "ora"

export async function handleLocalDir(
  target: string,
  options: any,
  spinner: Ora
) {
  const absolutePath = path.resolve(process.cwd(), target)
  const excludeGlobs = options.exclude || DEFAULT_IGNORES
  const includeGlobs = options.include || []
  const maxFiles = Number(options.maxFiles)
  const maxFileSizeKB = Number(options.maxFileSize)

  const gitignore =
    options.gitignore === false ? null : await loadGitignore(absolutePath)

  const files = await walkLocalDir(
    absolutePath,
    absolutePath,
    excludeGlobs,
    includeGlobs,
    maxFileSizeKB,
    maxFiles,
    gitignore
  )

  spinner.text = `Processing ${files.length} local files..`

  const totalChars = files.reduce((sum, f) => sum + f.content.length, 0)
  const estTokens = Math.round(totalChars / 4)

  const header = buildDigestHeader({
    title: `Local Digest — \`${path.basename(absolutePath)}\``,
    meta: {
      Path: `\`${absolutePath}\``,
      Date: new Date().toISOString().slice(0, 10),
      Files: files.length,
      "Est. tokens": `~${estTokens.toLocaleString()}`,
    },
  })

  const markdownParts = [header]
  for (const file of files) {
    markdownParts.push(`## File: ${file.path}\n\`\`\`\n${file.content}\n\`\`\``)
  }

  return markdownParts.join("\n\n")
}

```

## File: packages/cli/src/handlers/webpage.ts
```
import { buildDigestHeader, scrapeWebPage } from "@packmd/core"

export async function handleWebpage(target: string, options: any) {
  const scraped = await scrapeWebPage(target, {
    jinaApiKey: options.jinaApiKey,
  })

  const estTokens = Math.round((scraped.content?.length || 0) / 4)
  const header = buildDigestHeader({
    icon: "🌐",
    title: scraped.title || target,
    meta: {
      Source: `\`${target}\``,
      Date: new Date().toISOString().slice(0, 10),
      "Est. tokens": `~${estTokens.toLocaleString()}`,
    },
  })

  return `${header}\n\n${scraped.content || ""}`
}

```

## File: packages/cli/src/index.ts
```
#!/usr/bin/env node
import { Command } from "commander"
import { runAction } from "./actions/run"
import { name, description, version } from "../package.json"
import { cliOptions } from "./utils/program"

const program = new Command()

program
  .name(name)
  .description(description)
  .version(version, "-v, --version", "Output the version number")
  .argument(
    "[target]",
    "GitHub URL, Webpage URL, or local directory path (defaults to current directory)",
    "."
  )

cliOptions.forEach(({ flags, description, defaultValue }) => {
  if (defaultValue !== undefined) {
    program.option(flags, description, defaultValue)
  } else {
    program.option(flags, description)
  }
})

program.action(runAction)

program.parse()

```

## File: packages/cli/src/prompts/github.ts
```
import inquirer from "inquirer"

export async function promptGithubOptions(currentOptions: any) {
  // 1. Ask if they want to configure options
  const { customize } = await inquirer.prompt([
    {
      type: "confirm",
      name: "customize",
      message: "GitHub URL detected. Would you like to configure options?",
      default: false,
    },
  ])

  // If no, proceed with default options passed via CLI flags
  if (!customize) return currentOptions

  // 2. Prompt for specific configurations with defaults filled in
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "maxFiles",
      message: "Maximum number of files to include:",
      default: currentOptions.maxFiles || "200",
      validate: (val) => !isNaN(Number(val)) || "Please enter a valid number",
    },
    {
      type: "input",
      name: "maxFileSize",
      message: "Maximum file size threshold (in KB):",
      default: currentOptions.maxFileSize || "100",
      validate: (val) => !isNaN(Number(val)) || "Please enter a valid number",
    },
    {
      type: "password",
      name: "token",
      message: "GitHub Token (Optional - for private or larger repos):",
      default: currentOptions.token || "",
    },
  ])

  // Merge the answers back into the options object
  return { ...currentOptions, ...answers }
}

```

## File: packages/cli/src/utils/fs.ts
```
import fs from "node:fs/promises"
import path from "node:path"
import { minimatch } from "minimatch"
import type { Ignore } from "ignore"

export async function walkLocalDir(
  dir: string,
  base: string,
  excludeGlobs: string[],
  includeGlobs: string[],
  maxFileSizeKB: number,
  maxFiles: number,
  gitignore: Ignore | null = null,
  collected: { path: string; content: string }[] = []
): Promise<{ path: string; content: string }[]> {
  if (collected.length >= maxFiles) return collected

  const entries = await fs.readdir(dir)

  for (const name of entries) {
    if (collected.length >= maxFiles) break

    const fullPath = path.join(dir, name)
    const relativePath = path.relative(base, fullPath).replace(/\\/g, "/")

    const isExcluded = excludeGlobs.some((g) =>
      minimatch(relativePath, g, { dot: true })
    )
    if (isExcluded) continue

    const stats = await fs.stat(fullPath)

    // append '/' for directories — `ignore` needs it to match dir-only rules like `dist/`
    if (
      gitignore?.ignores(
        stats.isDirectory() ? `${relativePath}/` : relativePath
      )
    ) {
      continue
    }

    if (stats.isDirectory()) {
      await walkLocalDir(
        fullPath,
        base,
        excludeGlobs,
        includeGlobs,
        maxFileSizeKB,
        maxFiles,
        gitignore,
        collected
      )
    } else if (stats.isFile()) {
      if (includeGlobs.length > 0) {
        const isIncluded = includeGlobs.some((g) =>
          minimatch(relativePath, g, { dot: true })
        )
        if (!isIncluded) continue
      }
      const sizeKB = stats.size / 1024
      if (sizeKB <= maxFileSizeKB) {
        const content = await fs.readFile(fullPath, "utf-8")
        collected.push({ path: relativePath, content })
      }
    }
  }

  return collected
}

```

## File: packages/cli/src/utils/gitignore.ts
```
import fs from "node:fs/promises"
import path from "node:path"
import ignore, { Ignore } from "ignore"

/**
 * Walks upward from `startDir` collecting every .gitignore file found,
 * stopping at the directory containing `.git` (the repo root) or the
 * filesystem root — whichever comes first. Lets a package folder inherit
 * the monorepo's root .gitignore even if it has none of its own.
 */
export async function loadGitignore(startDir: string): Promise<Ignore | null> {
  const ig = ignore()
  let found = false
  let dir = startDir

  while (true) {
    try {
      const content = await fs.readFile(path.join(dir, ".gitignore"), "utf-8")
      ig.add(content)
      found = true
    } catch {
      // no .gitignore at this level — fine, keep walking up
    }

    try {
      await fs.access(path.join(dir, ".git"))
      break // reached the repo root
    } catch {
      // not there yet
    }

    const parent = path.dirname(dir)
    if (parent === dir) break // hit the filesystem root
    dir = parent
  }

  return found ? ig : null
}

```

## File: packages/cli/src/utils/program.ts
```
interface CliOption {
  flags: string
  description: string
  defaultValue?: string | boolean
}

export const cliOptions: CliOption[] = [
  {
    flags: "-o, --output <path>",
    description:
      "Specify a custom file path to save the generated Markdown digest",
  },
  {
    flags: "-t, --token <token>",
    description:
      "Provide a GitHub Personal Access Token for private repositories or extended rate limits",
  },
  {
    flags: "-m, --max-files <number>",
    description:
      "Limit the total number of files to include in the final digest",
    defaultValue: "200",
  },
  {
    flags: "-s, --max-file-size <number>",
    description: "Set the maximum allowed size (in KB) for individual files",
    defaultValue: "100",
  },
  {
    flags: "-i, --include <patterns...>",
    description:
      "Specify glob patterns to explicitly include certain files or directories",
  },
  {
    flags: "-e, --exclude <patterns...>",
    description:
      "Specify glob patterns to explicitly ignore certain files or directories",
  },
  {
    flags: "-c, --copy",
    description:
      "Automatically copy the generated Markdown digest to your clipboard",
    defaultValue: false,
  },
  {
    flags: "--jina-api-key <key>",
    description:
      "Provide a Jina API key for enhanced webpage scraping and parsing",
  },
  {
    flags: "--no-gitignore",
    description:
      "Don't respect .gitignore rules when scanning a local directory",
  },
]

```

## File: packages/cli/src/utils/version-check.ts
```
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import color from "picocolors"
import { name } from "../../package.json"

const REGISTRY_URL = `https://registry.npmjs.org/${name}/latest`
const CACHE_PATH = path.join(os.homedir(), `.${name}`, "version-check.json")
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h — don't hit the registry on every run
const FETCH_TIMEOUT_MS = 1500

interface VersionCache {
  lastChecked: number
  latestVersion: string
}

/** Compares plain "x.y.z" strings. 1 if a>b, -1 if a<b, 0 if equal. */
function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number)
  const pb = b.split(".").map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0
    const nb = pb[i] || 0
    if (na > nb) return 1
    if (na < nb) return -1
  }
  return 0
}

async function readCache(): Promise<VersionCache | null> {
  try {
    return JSON.parse(await fs.readFile(CACHE_PATH, "utf-8"))
  } catch {
    return null
  }
}

async function writeCache(data: VersionCache): Promise<void> {
  try {
    await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true })
    await fs.writeFile(CACHE_PATH, JSON.stringify(data), "utf-8")
  } catch {
    // non-fatal — worst case we just check again next run
  }
}

async function fetchLatestVersion(): Promise<string | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(REGISTRY_URL, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.npm.install-v1+json" }, // lightweight abbreviated response
    })
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.version === "string" ? data.version : null
  } catch {
    return null // offline, timed out, registry down — fail silently, never break the CLI
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Returns the latest published version string if it's newer than
 * `currentVersion`, otherwise null. Never throws.
 */
export async function checkForUpdate(
  currentVersion: string
): Promise<string | null> {
  const cache = await readCache()
  const isFresh = cache && Date.now() - cache.lastChecked < CACHE_TTL_MS

  const latestVersion = isFresh
    ? cache.latestVersion
    : await fetchLatestVersion()
  if (!latestVersion) return null

  if (!isFresh) await writeCache({ lastChecked: Date.now(), latestVersion })

  return compareVersions(latestVersion, currentVersion) > 0
    ? latestVersion
    : null
}

export function printUpdateNotice(
  currentVersion: string,
  latestVersion: string
): void {
  console.log()
  console.log(
    color.yellow(`  ↑ Update available: `) +
      color.dim(currentVersion) +
      color.yellow(" → ") +
      color.green(latestVersion)
  )
  console.log(
    color.dim(`  Run `) +
      color.cyan(`npm install -g ${name}@latest`) +
      color.dim(` to update.`)
  )
  console.log()
}

```

## File: packages/cli/tsconfig.json
```
{
  "extends": "@packmd/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "preserve",
    "moduleResolution": "bundler",
    "forceConsistentCasingInFileNames": true,
    "types": ["node"]
  },
  "include": ["src"]
}

```

## File: packages/cli/tsup.config.ts
```
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  clean: true,
  bundle: true,
  dts: true,
});
```

## File: packages/core/.npmignore
```
src/
tsconfig.json
tsup.config.ts
.gitignore
!dist/
!dist/**
node_modules
.turbo
```

## File: packages/core/README.md
```
## @packmd/core

**Shared core logic for PackMD** – the engine that powers both the [web app](https://packmd.vercel.app) and the [CLI](https://www.npmjs.com/package/packmd).

This package handles everything from fetching repositories and scraping web pages to building directory trees and generating clean, token‑efficient Markdown.

### Features

- **GitHub fetching** – retrieve repository metadata, list files, download content (supports private repos with token).
- **Web scraping** – uses the Jina Reader API to convert any web page into clean Markdown.
- **Local directory scanning** – recursively walk directories with `.gitignore` support.
- **Smart filtering** – apply glob patterns, size limits, binary detection, and ignore rules.
- **Tree building** – construct a hierarchical file tree from flat file lists.
- **Markdown generation** – produce a consistent, LLM‑ready output with headers, stats, and code blocks.

### Installation

```bash
npm install @packmd/core
# or
bun add @packmd/core
```

> **Note:** This package is intended for internal use by the PackMD ecosystem. You typically don’t need to install it directly unless you are extending or contributing to the project.

### Main Exports

| Export               | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `fetchGithubRepo`    | Fetch a GitHub repository and return a Markdown digest.               |
| `scrapeWebPage`      | Scrape a web page via Jina Reader and return its content as Markdown. |
| `buildFileTree`      | Build a nested `FileNode` tree from an array of `RawFile` objects.    |
| `generateMarkdown`   | Generate a complete Markdown string from a `FileNode` tree.           |
| `buildDigestHeader`  | Build a consistent header section for the digest.                     |
| `matchesAny`         | Test a path against an array of glob patterns.                        |
| `DEFAULT_IGNORES`    | Default exclude patterns for local and GitHub repositories.           |
| `packmdSchema` (Zod) | Schema for validating user input (URL, options, globs, etc.).         |

### Basic Usage Example

```typescript
import { fetchGithubRepo, generateMarkdown, buildFileTree } from "@packmd/core"

// Fetch a public GitHub repo
const result = await fetchGithubRepo("https://github.com/vercel/next.js", {
  maxFiles: 100,
  maxFileSizeKB: 50,
  excludeGlobs: ["**/*.test.ts"],
})

// `result.markdown` contains the complete digest
console.log(result.markdown)

// If you want to build a tree manually:
const tree = buildFileTree(result.files)
const markdown = generateMarkdown(tree, { showTree: true })
```

### License

MIT © [Holiday](https://github.com/thelastofinusa)

```

## File: packages/core/package.json
```
{
    "name": "@packmd/core",
    "version": "1.0.0",
    "description": "Core parsing and markdown generation logic for PackMD",
    "type": "module",
    "main": "./dist/index.cjs",
    "module": "./dist/index.js",
    "types": "./dist/index.d.ts",
    "exports": {
        ".": {
            "types": "./dist/index.d.ts",
            "import": "./dist/index.js",
            "require": "./dist/index.cjs"
        }
    },
    "files": [
        "dist"
    ],
    "scripts": {
        "build": "tsup",
        "dev": "tsup --watch",
        "lint": "eslint src/",
        "test": "vitest run",
        "test:watch": "vitest",
        "clean": "rm -rf dist node_modules .turbo",
        "prepublishOnly": "bun run build",
        "pushout": "npm publish --access public",
        "pushout-inc": "npm version patch --no-git-tag-version && bun run pushout"
    },
    "devDependencies": {
        "@types/jsdom": "^28.0.3",
        "@types/node": "^26.1.1",
        "tsup": "^8.5.1",
        "typescript": "^5",
        "vitest": "^4.1.10"
    },
    "keywords": [
        "packmd",
        "markdown",
        "github",
        "llm",
        "codebase",
        "digest",
        "parser",
        "generator",
        "scraper",
        "jina",
        "git"
    ],
    "author": "Holiday (https://github.com/thelastofinusa)",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/thelastofinusa/packmd.git",
        "directory": "packages/core"
    },
    "bugs": {
        "url": "https://github.com/thelastofinusa/packmd/issues"
    },
    "homepage": "https://packmd.vercel.app/docs",
    "engines": {
        "node": ">=18.0.0"
    },
    "publishConfig": {
        "access": "public"
    },
    "dependencies": {
        "zod": "^4.4.3"
    }
}
```

## File: packages/core/src/config/defaults.ts
```
import { ParserOptions, GeneratorOptions, PackMDConfig } from "../types"

export const DEFAULT_IGNORES = [
  "**/node_modules",
  "**/node_modules/**",
  "**/.git/**",
  "**/.next/**",
  "**/.next",
  "**/.turbo/**",
  "**/.turbo",
  "**/dist/**",
  "**/dist",
  "**/out/**",
  "**/out",
  "**/build/**",
  "**/build",
  "**/coverage/**",
  "**/coverage",
  "**/.env",
  "**/.env.*",
  "**/package-lock.json",
  "**/pnpm-lock.yaml",
  "**/yarn.lock",
  "**/bun.lock",
]

export const defaultParserOptions: ParserOptions = {
  ignore: DEFAULT_IGNORES,
  includeContent: true,
  maxFileSize: 1048576, // 1MB in bytes (prevents accidental ingestion of huge assets)
}

export const defaultGeneratorOptions: GeneratorOptions = {
  showTree: true,
  includeLineNumbers: false,
}

export const defaultConfig: PackMDConfig = {
  parser: defaultParserOptions,
  generator: defaultGeneratorOptions,
}

```

## File: packages/core/src/fetchers/github.ts
```
import { matchesAny } from "../utils/filter"
import { buildFileTree } from "../parser"
import { generateMarkdown } from "../generator/markdown"
import { GithubRepoResult, RawFile, SkippedFile } from "../types"
import { DEFAULT_IGNORES, defaultParserOptions } from "../config/defaults"
import { buildDigestHeader } from "../generator/header"

const GITHUB_API = "https://api.github.com/repos"

const BINARY_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "bmp",
  "ico",
  "tiff",
  "pdf",
  "zip",
  "tar",
  "gz",
  "7z",
  "rar",
  "exe",
  "dll",
  "so",
  "dylib",
  "bin",
  "dat",
  "class",
  "jar",
  "wasm",
  "woff",
  "woff2",
  "ttf",
  "eot",
  "otf",
  "mp3",
  "mp4",
  "mov",
  "avi",
  "webm",
  "flac",
  "wav",
  "db",
  "sqlite",
  "lock",
])

function isLikelyBinaryPath(path: string): boolean {
  const ext = path.split(".").pop()?.toLowerCase()
  return !!ext && BINARY_EXTENSIONS.has(ext)
}

/**
 * Smartly parses any GitHub URL variant:
 * - Root repo: https://github.com/vercel/next.js
 * - Branch root: https://github.com/vercel/next.js/tree/canary
 * - Subdirectory: https://github.com/vercel/next.js/tree/canary/packages/next
 * - Single file blob: https://github.com/vercel/next.js/blob/canary/package.json
 */
function parseGithubUrl(url: string): {
  owner: string
  repo: string
  type?: "tree" | "blob"
  segments: string[]
} {
  const cleaned = url
    .split("#")[0]!
    .split("?")[0]!
    .replace(/\/$/, "")
    .replace(/\.git$/, "")

  const match = cleaned.match(
    /github\.com\/([^\/]+)\/([^\/]+)(?:\/(tree|blob)\/(.+))?$/i
  )
  if (!match || !match[1] || !match[2]) {
    throw new Error(
      "Invalid GitHub repository URL. Expected something like https://github.com/owner/repo or https://github.com/owner/repo/tree/branch/subdir."
    )
  }

  const rest = match[4]
  const segments = rest ? rest.split("/").filter(Boolean) : []
  return {
    owner: match[1],
    repo: match[2],
    type: match[3]?.toLowerCase() as "tree" | "blob" | undefined,
    segments,
  }
}

function buildHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "PackMD-App",
  }
  if (token) {
    headers.Authorization = token.startsWith("github_pat_")
      ? `Bearer ${token}`
      : `token ${token}`
  }
  return headers
}

function rateLimitMessage(res: Response): string {
  const remaining = res.headers.get("x-ratelimit-remaining")
  const reset = res.headers.get("x-ratelimit-reset")
  const base = "GitHub API rate limit exceeded."
  const hint =
    "Add a personal access token (PAT) in options to raise the limit to 5,000 requests/hour."
  if (remaining === "0" && reset) {
    const resetDate = new Date(Number(reset) * 1000)
    return `${base} Resets at ${resetDate.toLocaleTimeString()}. ${hint}`
  }
  return `${base} ${hint}`
}

async function refExists(
  owner: string,
  repo: string,
  candidate: string,
  headers: Record<string, string>
): Promise<boolean> {
  const branchRes = await fetch(
    `${GITHUB_API}/${owner}/${repo}/branches/${encodeURIComponent(candidate)}`,
    { headers }
  )
  if (branchRes.ok) return true

  const tagRes = await fetch(
    `${GITHUB_API}/${owner}/${repo}/git/ref/tags/${encodeURIComponent(candidate)}`,
    { headers }
  )
  return tagRes.ok
}

/**
 * Resolves ref (branch/tag) when names contain slashes (e.g. feature/my-branch)
 */
async function resolveRef(
  owner: string,
  repo: string,
  segments: string[],
  headers: Record<string, string>
): Promise<{ ref: string; subpath: string }> {
  if (segments.length <= 1) {
    return { ref: segments[0] || "", subpath: "" }
  }

  const first = segments[0]!
  if (await refExists(owner, repo, first, headers)) {
    return { ref: first, subpath: segments.slice(1).join("/") }
  }

  const maxAttempts = Math.min(segments.length, 8)
  for (let i = maxAttempts; i > 1; i--) {
    const candidate = segments.slice(0, i).join("/")
    if (await refExists(owner, repo, candidate, headers)) {
      return { ref: candidate, subpath: segments.slice(i).join("/") }
    }
  }

  return { ref: first, subpath: segments.slice(1).join("/") }
}

function resolveMaxBytes(maxFileSizeKB?: number): number {
  const kb =
    typeof maxFileSizeKB === "number" &&
    !Number.isNaN(maxFileSizeKB) &&
    maxFileSizeKB > 0
      ? maxFileSizeKB
      : defaultParserOptions.maxFileSize! / 1024
  return kb * 1024
}

function resolveMaxFiles(maxFiles?: number): number {
  return typeof maxFiles === "number" && !Number.isNaN(maxFiles) && maxFiles > 0
    ? maxFiles
    : 200
}

interface BlobCandidate {
  path: string
  fullPath: string
  size: number
  sha?: string
}

async function downloadRawFile(
  owner: string,
  repo: string,
  ref: string,
  blob: BlobCandidate,
  token?: string,
  attempt = 0
): Promise<{ ok: true; file: RawFile } | { ok: false; skipped: SkippedFile }> {
  const encodedPath = blob.fullPath.split("/").map(encodeURIComponent).join("/")
  const encodedRef = ref.split("/").map(encodeURIComponent).join("/")
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${encodedRef}/${encodedPath}`

  try {
    const res = await fetch(
      rawUrl,
      token
        ? {
            headers: {
              Authorization: token.startsWith("github_pat_")
                ? `Bearer ${token}`
                : `token ${token}`,
            },
          }
        : undefined
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const buffer = await res.arrayBuffer()
    const sample = new Uint8Array(buffer.slice(0, 8000))
    if (sample.includes(0)) {
      return {
        ok: false,
        skipped: { path: blob.path, reason: "binary", size: blob.size },
      }
    }

    const content = new TextDecoder("utf-8").decode(buffer)
    return { ok: true, file: { path: blob.path, content, size: blob.size } }
  } catch (err) {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)))
      return downloadRawFile(owner, repo, ref, blob, token, attempt + 1)
    }
    return {
      ok: false,
      skipped: { path: blob.path, reason: "fetch_failed", size: blob.size },
    }
  }
}

export async function fetchGithubRepo(
  repoUrl: string,
  options: {
    token?: string
    excludeGlobs?: string[]
    includeGlobs?: string[]
    maxFileSizeKB?: number
    maxFiles?: number
    useDefaultIgnores?: boolean
    onProgress?: (msg: string) => void
  } = {}
): Promise<GithubRepoResult> {
  const { owner, repo, type, segments } = parseGithubUrl(repoUrl)
  const token = options.token
  const headers = buildHeaders(token)
  const onProgress = options.onProgress || (() => {})

  onProgress(`Fetching metadata for ${owner}/${repo}...`)
  const repoRes = await fetch(`${GITHUB_API}/${owner}/${repo}`, { headers })
  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(
        token
          ? "Repository not found or your token lacks access permissions."
          : "Repository not found or is private. Please provide a GitHub Personal Access Token (PAT)."
      )
    }
    if (repoRes.status === 403 || repoRes.status === 429) {
      throw new Error(rateLimitMessage(repoRes))
    }
    throw new Error(`GitHub API error: ${repoRes.statusText}`)
  }
  const repoData = await repoRes.json()
  const defaultBranch: string = repoData.default_branch || "main"

  let ref = defaultBranch
  let subpath = ""

  if (segments.length > 0) {
    onProgress("Resolving branch, tag, or path...")
    const resolved = await resolveRef(owner, repo, segments, headers)
    ref = resolved.ref || defaultBranch
    subpath = resolved.subpath
  }

  // If it's a direct file blob URL (e.g. /blob/main/package.json), treat subpath as the exact file path
  if (type === "blob" && segments.length > 0) {
    ref = segments[0] || defaultBranch
    subpath = segments.slice(1).join("/")
  }

  onProgress(`Fetching git tree for ref (${ref})...`)
  const treeRes = await fetch(
    `${GITHUB_API}/${owner}/${repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
    { headers }
  )
  if (!treeRes.ok) {
    if (treeRes.status === 403 || treeRes.status === 429) {
      throw new Error(rateLimitMessage(treeRes))
    }
    if (treeRes.status === 404) {
      throw new Error(
        `Branch, tag, or path "${ref}" was not found on ${owner}/${repo}.`
      )
    }
    throw new Error(`Failed to fetch tree: ${treeRes.statusText}`)
  }

  const treeData = await treeRes.json()
  const truncated = Boolean(treeData.truncated)
  if (truncated) {
    onProgress(
      "Warning: GitHub truncated this tree listing due to repository size."
    )
  }

  const prefix = subpath ? `${subpath}/` : ""
  const allBlobs: BlobCandidate[] = (treeData.tree || [])
    .filter((item: any) => item.type === "blob")
    .filter((item: any) => {
      if (!subpath) return true
      if (type === "blob") return item.path === subpath
      return item.path === subpath || item.path.startsWith(prefix)
    })
    .map((item: any) => {
      const fullPath = item.path as string
      const relativePath =
        subpath && type !== "blob"
          ? fullPath.startsWith(prefix)
            ? fullPath.slice(prefix.length)
            : fullPath.split("/").pop()!
          : fullPath
      return {
        fullPath,
        path: relativePath,
        size: (item.size as number) || 0,
        sha: item.sha as string | undefined,
      }
    })

  if (subpath && allBlobs.length === 0) {
    throw new Error(
      `No files found under "${subpath}" on ${owner}/${repo}@${ref}.`
    )
  }

  const maxBytes = resolveMaxBytes(options.maxFileSizeKB)
  const exclude =
    options.useDefaultIgnores === false
      ? options.excludeGlobs || []
      : [...DEFAULT_IGNORES, ...(options.excludeGlobs || [])]
  const include = options.includeGlobs || []
  const maxFiles = resolveMaxFiles(options.maxFiles)

  const candidates: BlobCandidate[] = []
  const skipped: SkippedFile[] = []

  for (const b of allBlobs) {
    if (matchesAny(b.path, exclude) || matchesAny(b.fullPath, exclude)) {
      skipped.push({ path: b.path, reason: "excluded", size: b.size })
      continue
    }
    if (
      include.length > 0 &&
      !matchesAny(b.path, include) &&
      !matchesAny(b.fullPath, include)
    ) {
      skipped.push({ path: b.path, reason: "excluded", size: b.size })
      continue
    }
    if (isLikelyBinaryPath(b.path)) {
      skipped.push({ path: b.path, reason: "binary", size: b.size })
      continue
    }
    if (b.size > maxBytes) {
      skipped.push({ path: b.path, reason: "too_large", size: b.size })
      continue
    }
    candidates.push(b)
  }

  candidates.sort((a, b) => a.path.localeCompare(b.path))
  const overLimit = candidates.slice(maxFiles)
  for (const o of overLimit) {
    skipped.push({ path: o.path, reason: "over_limit", size: o.size })
  }
  const limited = candidates.slice(0, maxFiles)

  const files: RawFile[] = []
  const batchSize = 10

  for (let i = 0; i < limited.length; i += batchSize) {
    const batch = limited.slice(i, i + batchSize)
    onProgress(
      `Downloading files (${Math.min(i + batchSize, limited.length)}/${limited.length})...`
    )

    const results = await Promise.all(
      batch.map((b) => downloadRawFile(owner, repo, ref, b, token))
    )

    for (const result of results) {
      if (result.ok) files.push(result.file)
      else skipped.push(result.skipped)
    }
  }

  onProgress(`Done. Included ${files.length} files, skipped ${skipped.length}.`)

  const tree = buildFileTree(files, {
    ignore: [],
    includeContent: true,
    maxFileSize: maxBytes,
  })

  const headerLabel = subpath
    ? `${owner}/${repo}/${subpath}`
    : `${owner}/${repo}`
  const refSuffix = ref !== defaultBranch ? ` @ ${ref}` : ""
  const totalChars = files.reduce((sum, f) => sum + (f.content?.length || 0), 0)
  const estTokens = Math.round(totalChars / 4)

  const headerText = buildDigestHeader({
    icon: "🐙",
    title: `GitHub Digest — \`${headerLabel}${refSuffix}\``,
    meta: {
      Source: `\`https://github.com/${owner}/${repo}\``,
      Files: files.length,
      "Est. tokens": `~${estTokens.toLocaleString()}`,
      ...(truncated
        ? { Note: "⚠️ GitHub truncated this tree (repo too large)" }
        : {}),
    },
  })

  const markdown = generateMarkdown(tree, { showTree: true, headerText })

  return {
    owner,
    repo,
    ref,
    defaultBranch,
    subpath: subpath || undefined,
    truncated,
    files: files.map((f) => ({ ...f, type: "blob" as const })),
    tree,
    skipped,
    markdown,
  }
}

```

## File: packages/core/src/fetchers/scraper.ts
```
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

```

## File: packages/core/src/generator/header.ts
```
export interface DigestHeaderOptions {
  /** Emoji or short icon prefix for the title line. Defaults to "📦". */
  icon?: string
  /** Main title text, rendered as an H1. */
  title: string
  /** Key/value pairs rendered as a compact bold metadata block under the title. */
  meta: Record<string, string | number>
}

/**
 * Builds the shared header used at the top of every PackMD digest —
 * GitHub, webpage, or local directory — so all three look consistent.
 */
export function buildDigestHeader({
  icon = "📦",
  title,
  meta,
}: DigestHeaderOptions): string {
  const metaLines = Object.entries(meta)
    .map(([label, value]) => `**${label}:** ${value}`)
    .join("  \n") // markdown hard line-break — keeps lines stacked, not one paragraph

  return [`# ${icon} ${title}`, metaLines, `---`].join("\n\n")
}

```

## File: packages/core/src/generator/markdown.ts
```
import { FileNode, GeneratorOptions } from "../types"
import { defaultGeneratorOptions } from "../config/defaults"

/**
 * Generates the final Markdown string from the parsed FileNode tree.
 */
export function generateMarkdown(
  tree: FileNode[],
  options: Partial<GeneratorOptions> = {}
): string {
  const opts = { ...defaultGeneratorOptions, ...options }
  let markdown = ""

  // 1. Optional Header text
  if (opts.headerText) {
    markdown += `${opts.headerText}\n\n`
  }

  // 2. Visual ASCII Directory Tree
  if (opts.showTree) {
    markdown += "### Repository Structure\n\n```text\n"
    markdown += ".\n"
    markdown += generateTreeString(tree, "")
    markdown += "```\n\n"
  }

  // 3. File Contents
  markdown += "### File Contents\n\n"
  const allFiles = flattenFiles(tree)

  if (allFiles.length === 0) {
    markdown += "*No files found or all files were ignored.*\n"
    return markdown
  }

  for (const file of allFiles) {
    markdown += `#### \`${file.path}\`\n\n`

    if (file.content === undefined) {
      markdown += "*Content not extracted or file is empty.*\n\n"
      markdown += "---\n\n"
      continue
    }

    const language = getMarkdownLanguage(file.extension)
    const contentToRender = opts.includeLineNumbers
      ? addLineNumbers(file.content)
      : file.content

    markdown += `\`\`\`${language}\n`
    // Ensure the code block is closed safely even if the content lacks a trailing newline
    markdown += contentToRender.endsWith("\n")
      ? contentToRender
      : `${contentToRender}\n`
    markdown += "```\n\n"
    markdown += "---\n\n"
  }

  return markdown.trim()
}

/**
 * Recursively generates an ASCII-style tree string (similar to the 'tree' command).
 */
function generateTreeString(nodes: FileNode[], prefix: string): string {
  let result = ""

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const isLast = i === nodes.length - 1

    // Use '└── ' for the final item in a directory, '├── ' for everything else
    const connector = isLast ? "└── " : "├── "

    result += `${prefix}${connector}${node?.name}${node?.isDirectory ? "/" : ""}\n`

    if (node?.isDirectory && node?.children) {
      // If it's the last item, subsequent children need spaces, otherwise they need a vertical line
      const nextPrefix = prefix + (isLast ? "    " : "│   ")
      result += generateTreeString(node?.children, nextPrefix)
    }
  }

  return result
}

/**
 * Flattens the hierarchical tree into a single array of just the files.
 * This makes it much easier to loop through and print contents sequentially.
 */
function flattenFiles(nodes: FileNode[]): FileNode[] {
  let files: FileNode[] = []

  for (const node of nodes) {
    if (node.isDirectory && node.children) {
      files = files.concat(flattenFiles(node.children))
    } else if (!node.isDirectory) {
      files.push(node)
    }
  }

  return files
}

/**
 * Prepends line numbers to a string of text.
 * Automatically pads the numbers so they align perfectly.
 */
function addLineNumbers(content: string): string {
  const lines = content.split("\n")
  const padLength = lines.length.toString().length

  return lines
    .map((line, index) => {
      const lineNumber = String(index + 1).padStart(padLength, " ")
      return `${lineNumber} | ${line}`
    })
    .join("\n")
}

/**
 * Maps standard file extensions to Markdown syntax highlighting languages.
 * Falls back to treating the extension as the language if not explicitly mapped.
 */
function getMarkdownLanguage(extension?: string): string {
  if (!extension) return "text"

  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    md: "markdown",
    html: "html",
    css: "css",
    scss: "scss",
    yml: "yaml",
    yaml: "yaml",
    sh: "bash",
    bash: "bash",
    py: "python",
    go: "go",
    rs: "rust",
  }

  return map[extension.toLowerCase()] || extension.toLowerCase()
}

```

## File: packages/core/src/index.ts
```
// Export core configuration and limits
export {
  DEFAULT_IGNORES,
  defaultParserOptions,
  defaultGeneratorOptions,
  defaultConfig,
} from "./config/defaults"

// Export type definitions
export * from "./types"
export * from "./utils/schema"
export * from "./fetchers/github"
export * from "./fetchers/scraper"

// Export the parser logic (Updated to match your parser file)
export { buildFileTree } from "./parser"

// Export the markdown generation logic
export { generateMarkdown } from "./generator/markdown"
export { buildDigestHeader } from "./generator/header"

// Export utilities (useful if the CLI/Web wants to pre-filter files before passing them)
export {
  compileIgnorePatterns,
  isIgnored,
  filterRawFiles,
} from "./utils/filter"

```

## File: packages/core/src/parser/index.ts
```
import { FileNode, ParserOptions, RawFile } from "../types"
import { defaultParserOptions } from "../config/defaults"
import { filterRawFiles } from "../utils/filter"

/**
 * Converts a flat array of RawFiles into a nested FileNode directory tree.
 */
export function buildFileTree(
  rawFiles: RawFile[],
  options: Partial<ParserOptions> = {}
): FileNode[] {
  const opts = { ...defaultParserOptions, ...options }

  // 1. Filter out ignored files first to save processing time
  const filteredFiles = filterRawFiles(rawFiles, opts.ignore || [])

  const root: FileNode[] = []

  // 2. Build the tree structure
  for (const rawFile of filteredFiles) {
    const parts = rawFile.path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i] as string
      const isFile = i === parts.length - 1

      // Check if this directory/file already exists at the current level
      let existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (!isFile) {
          // Navigate deeper into the existing directory
          currentLevel = existingNode.children!
        }
      } else {
        // Create a new node
        const newNode: FileNode = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          isDirectory: !isFile,
        }

        if (isFile) {
          // Handle File specifics
          const extIndex = part.lastIndexOf(".")
          newNode.extension =
            extIndex > 0 ? part.slice(extIndex + 1) : undefined

          if (opts.includeContent) {
            // Apply size limits to prevent generating massive markdown blocks
            if (
              opts.maxFileSize &&
              rawFile.size &&
              rawFile.size > opts.maxFileSize
            ) {
              newNode.content = `[Content omitted: File size exceeds ${opts.maxFileSize} bytes]`
            } else {
              newNode.content = rawFile.content
            }
          }
          newNode.size = rawFile.size
        } else {
          // Handle Directory specifics
          newNode.children = []
        }

        currentLevel.push(newNode)

        // If it's a directory, update the pointer so subsequent parts are nested inside it
        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  // Optional: Sort the tree so directories appear first, then files alphabetically
  sortTree(root)
  return root
}

/**
 * Recursively sorts the tree: directories first, then alphabetical.
 */
function sortTree(nodes: FileNode[]) {
  nodes.sort((a, b) => {
    if (a.isDirectory === b.isDirectory) {
      return a.name.localeCompare(b.name)
    }
    return a.isDirectory ? -1 : 1
  })

  for (const node of nodes) {
    if (node.children) {
      sortTree(node.children)
    }
  }
}

```

## File: packages/core/src/types/index.ts
```
/**
 * Represents a single file or directory within the parsed repository structure.
 * This is environment-agnostic; it doesn't care if it was generated via Node's `fs`
 * or a browser-based file drop API.
 */
export interface FileNode {
  /** The name of the file or directory (e.g., 'index.ts', 'src') */
  name: string
  /** The relative path from the root of the parsed directory (e.g., 'src/utils/index.ts') */
  path: string
  /** True if the node is a directory, false if it is a file */
  isDirectory: boolean
  /** The file extension without the dot (e.g., 'ts', 'json'). Undefined for directories. */
  extension?: string
  /** The raw text content of the file. Undefined for directories or if content extraction is disabled. */
  content?: string
  /** Array of child nodes. Undefined if this node is a file. */
  children?: FileNode[]
  /** File size in bytes. Useful for filtering out massively bloated files before parsing. */
  size?: number
}

/**
 * Configuration options dictating how raw files are processed into a FileNode tree.
 */
export interface ParserOptions {
  /** Array of exact matches or glob patterns to ignore (e.g., ['node_modules', '.git', '*.log']) */
  ignore: string[]
  /** Maximum folder depth to traverse. Undefined or 0 means infinite depth. */
  maxDepth?: number
  /** Whether to extract file contents. If false, only the tree structure is built. Defaults to true. */
  includeContent?: boolean
  /** Maximum file size (in bytes) to read. Files exceeding this are added to the tree without content. */
  maxFileSize?: number
}

/**
 * Configuration options dictating how the FileNode tree is transformed into Markdown.
 */
export interface GeneratorOptions {
  /** Whether to render an ASCII-style file tree at the top of the Markdown output. Defaults to true. */
  showTree?: boolean
  /** Whether to inject line numbers into the markdown code blocks. Defaults to false. */
  includeLineNumbers?: boolean
  /** Optional custom title or description to inject at the very top of the output. */
  headerText?: string
  /** A way to collapse or summarize specific files instead of printing their full content. */
  collapseThreshold?: number
}

/**
 * The unified configuration object for PackMD.
 */
export interface PackMDConfig {
  parser: ParserOptions
  generator: GeneratorOptions
}

export interface ScraperOptions {
  /**
   * Optional Jina API Key. Passing this upgrades the free rate limit
   * from 20 Requests Per Minute to 500 Requests Per Minute.
   */
  jinaApiKey?: string
  /**
   * Maximum number of times to retry the request if rate-limited (HTTP 429)
   * or if a network error occurs. Defaults to 3.
   */
  maxRetries?: number
  /**
   * Abort after this many milliseconds. Defaults to 30000.
   */
  timeoutMs?: number
  /**
   * Callback fired during retry loops or rate-limit pauses to update the CLI/UI.
   */
  onProgress?: (msg: string) => void
}

export interface WebScrapeResult {
  url: string
  title: string
  /** Markdown body converted from the extracted HTML. */
  content: string
  /** Ready-to-use markdown: a title heading followed by the content. */
  markdown: string
  excerpt?: string
  byline?: string | null
  siteName?: string | null
  /**
   * Indicates if the page was fully rendered.
   * (Now defaults to true as Jina handles JS execution natively).
   */
  rendered: boolean
}

export interface GithubFileNode {
  path: string
  type: "blob" | "tree"
  size?: number
  sha?: string
  content?: string
}

export interface GithubRepoResult {
  owner: string
  repo: string
  /** The branch, tag, or commit SHA the digest was generated from. */
  ref: string
  /** The repo's actual default branch (even if a different `ref` was requested). */
  defaultBranch: string
  /** Set when the URL pointed at a subdirectory (e.g. `/tree/main/packages/core`). */
  subpath?: string
  /** True if GitHub truncated the tree listing because the repo is very large. */
  truncated: boolean
  files: GithubFileNode[]
  tree: FileNode[]
  skipped: SkippedFile[]
  markdown: string
}

/**
 * The flat file structure passed into the core by the consuming environment.
 */
export interface RawFile {
  /** The relative path (e.g., 'src/components/Button.tsx') */
  path: string
  /** The stringified content of the file */
  content?: string
  /** File size in bytes */
  size?: number
}

export interface SkippedFile {
  path: string
  reason: "too_large" | "excluded" | "binary" | "fetch_failed" | "over_limit"
  size?: number
}

```

## File: packages/core/src/utils/filter.ts
```
import { RawFile } from "../types"

/**
 * Converts standard ignore patterns (like .gitignore) into Regular Expressions.
 * Supports '*' (match anything except slash), '**' (match across directories), and '?' (match one char).
 */
export function compileIgnorePatterns(patterns: string[]): RegExp[] {
  return patterns.map((pattern) => {
    // 1. Escape standard Regex characters to avoid syntax errors
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")

    // 2. Convert glob stars to Regex equivalents
    // Handle '**' (Match any number of directories)
    let regexStr = escaped.replace(/\\\*\\\*/g, ".*")

    // Handle '*' (Match any character EXCEPT a directory separator)
    regexStr = regexStr.replace(/\\\*/g, "[^/]*")

    // Handle '?' (Match any single character EXCEPT a directory separator)
    regexStr = regexStr.replace(/\\\?/g, "[^/]")

    // 3. Ensure the pattern matches either the start of the path,
    // a directory boundary, or the exact filename.
    return new RegExp(`(^|/)${regexStr}(/|$)`)
  })
}

/**
 * Checks if a specific file path should be ignored.
 */
export function isIgnored(filePath: string, ignoreRegexes: RegExp[]): boolean {
  return ignoreRegexes.some((regex) => regex.test(filePath))
}

/**
 * Takes an array of RawFiles and filters out any that match the ignore patterns.
 */
export function filterRawFiles(
  files: RawFile[],
  ignorePatterns: string[]
): RawFile[] {
  if (!ignorePatterns || ignorePatterns.length === 0) {
    return files
  }

  const regexes = compileIgnorePatterns(ignorePatterns)
  return files.filter((file) => !isIgnored(file.path, regexes))
}

/**
 * Tiny glob matcher. Supports **, *, ?, and literal segments.
 * Checks if a given path matches any of the provided glob patterns.
 */
export function matchesAny(path: string, patterns: string[]): boolean {
  if (patterns.length === 0) return false

  // Convert a glob pattern to a RegExp
  function globToRegex(glob: string): RegExp {
    let re = ""
    for (let i = 0; i < glob.length; i++) {
      const c = glob[i] as string
      if (c === "*") {
        if (glob[i + 1] === "*") {
          re += ".*"
          i++
          if (glob[i + 1] === "/") i++
        } else {
          re += "[^/]*"
        }
      } else if (c === "?") {
        re += "[^/]"
      } else if (".+^${}()|[]\\".includes(c)) {
        re += "\\" + c
      } else {
        re += c
      }
    }
    return new RegExp("^" + re + "$")
  }

  return patterns.some((p) => {
    const re = globToRegex(p)
    if (re.test(path)) return true
    // Also match base name for patterns without a slash
    if (!p.includes("/")) {
      const base = path.split("/").pop() || ""
      if (re.test(base)) return true
    }
    return false
  })
}

```

## File: packages/core/src/utils/schema.ts
```
import * as z from "zod"

const normalizeUrl = (value: string) => {
  const trimmed = value.trim()
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

/**
 * Accepts strings or numbers from form inputs, allows empty/undefined values,
 * validates positive numbers >= 1, and transforms valid values into actual `number` types.
 */
const optionalNumericString = z
  .union([z.string(), z.number()])
  .optional()
  .refine(
    (val) => {
      if (val === undefined || val === null || val === "") return true
      const num = Number(val)
      return !isNaN(num) && num >= 1
    },
    { message: "Must be a valid number (at least 1)" }
  )

export const packmdSchema = z.object({
  url: z
    .url("Please enter a valid GitHub repository or website URL.")
    .min(1, "Please enter a valid GitHub repository or website URL.")
    .transform(normalizeUrl)
    .pipe(z.url("Please enter a valid GitHub repository or website URL.")),
  maxFileSizeKB: optionalNumericString,
  maxFiles: optionalNumericString,
  token: z.string().optional(),
  includeGlobs: z.array(z.string()),
  excludeGlobs: z.array(z.string()),
})

export type PackmdSchemaType = z.infer<typeof packmdSchema>

```

## File: packages/core/tsconfig.json
```
{
  "extends": "@packmd/tsconfig/base.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"]
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

```

## File: packages/core/tsup.config.ts
```
import { defineConfig } from "tsup"

export default defineConfig({
  // The entry point for the entire package
  entry: ["src/index.ts"],
  // Output both CommonJS (for Node CLI) and ES Modules (for React Web)
  format: ["cjs", "esm"],
  // Automatically generate TypeScript declarations (.d.ts)
  dts: true,
  // Clean the dist folder before every build
  clean: true,
  // Generate sourcemaps for easier debugging in the consuming apps
  sourcemap: true,
  // Remove unused code
  treeshake: true,
  // Disable splitting since we only have one entry point
  splitting: false,
  // Keep false for dev; your web bundler (Vite/Next) or CLI bundler will handle minification
  minify: false,
})

```

## File: packages/eslint-config/README.md
```
# `@packmd/eslint-config`

Shared eslint configuration for the workspace.

```

## File: packages/eslint-config/base.js
```
import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import onlyWarn from "eslint-plugin-only-warn"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**", ".next/**", "**/.turbo/**", "**/coverage/**"],
  },
]

```

## File: packages/eslint-config/next.js
```
import js from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]

```

## File: packages/eslint-config/package.json
```
{
  "name": "@packmd/eslint-config",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "exports": {
    "./base": "./base.js",
    "./next-js": "./next.js",
    "./react-internal": "./react-internal.js"
  },
  "devDependencies": {
    "@eslint/js": "^9",
    "@next/eslint-plugin-next": "^16.2.6",
    "@typescript-eslint/eslint-plugin": "^8.60.0",
    "@typescript-eslint/parser": "^8.60.0",
    "eslint": "^9",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-only-warn": "^1.2.1",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-turbo": "^2.9.15",
    "globals": "^17.6.0",
    "typescript": "^5",
    "typescript-eslint": "^8.60.0"
  }
}
```

## File: packages/eslint-config/react-internal.js
```
import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]

```

## File: packages/tsconfig/README.md
```
# `@packmd/tsconfig`

Shared typescript configuration for the workspace.

```

## File: packages/tsconfig/base.json
```
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "incremental": false,
    "isolatedModules": true,
    "lib": ["es2022", "DOM", "DOM.Iterable"],
    "module": "NodeNext",
    "moduleDetection": "force",
    "moduleResolution": "NodeNext",
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022"
  }
}

```

## File: packages/tsconfig/nextjs.json
```
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Next.js",
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "jsx": "preserve",
    "noEmit": true
  }
}

```

## File: packages/tsconfig/package.json
```
{
  "name": "@packmd/tsconfig",
  "version": "0.0.0",
  "private": true,
  "license": "PROPRIETARY",
  "publishConfig": {
    "access": "public"
  }
}
```

## File: packages/tsconfig/react-library.json
```
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "React Library",
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}

```

## File: packages/ui/components.json
```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "menuColor": "default",
  "menuAccent": "subtle",
  "aliases": {
    "components": "@packmd/ui/components",
    "utils": "@packmd/ui/lib/utils",
    "ui": "@packmd/ui/components",
    "lib": "@packmd/ui/lib",
    "hooks": "@packmd/ui/hooks"
  },
  "registries": {
    "@reui": "https://reui.io/r/{style}/{name}.json",
    "@canvas-ui": "https://canvasui.dev/r/{name}.json"
  }
}

```

## File: packages/ui/eslint.config.js
```
import { config } from "@packmd/eslint-config/react-internal"

/** @type {import("eslint").Linter.Config} */
export default config

```

## File: packages/ui/package.json
```
{
  "name": "@packmd/ui",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "lint": "eslint",
    "format": "prettier --write \"**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf node_modules .turbo"
  },
  "dependencies": {
    "@base-ui/react": "^1.6.0",
    "@react-symbols/icons": "^1.4.1",
    "@rexa-developer/tiks": "^0.3.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cuelume": "^0.1.2",
    "jotai": "^2.20.2",
    "lucide-react": "^1.26.0",
    "motion": "^12.42.2",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "reicon-react": "^1.1.302",
    "shadcn": "^4.14.0",
    "shiki": "^4.3.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.6.0",
    "tw-animate-css": "^1.4.0",
    "web-haptics": "^0.0.6",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@turbo/gen": "^2.9.15",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@packmd/eslint-config": "workspace:*",
    "@packmd/tsconfig": "workspace:*",
    "eslint": "^9",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./postcss.config": "./postcss.config.mjs",
    "./lib/*": "./src/lib/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts"
  }
}
```

## File: packages/ui/postcss.config.mjs
```
/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: { "@tailwindcss/postcss": {} },
};

export default config;

```

## File: packages/ui/src/components/api-reference.tsx
```
export interface ApiProp {
  /** Property name, rendered as code. */
  name: string
  /** Short description shown under the name. */
  description: string
  /** Type, rendered as a code chip. */
  type: string
  /** Default value, rendered as a code chip. Omit for none. */
  defaultValue?: string
}

export function ApiReference({ props }: { props: ApiProp[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-card">
              <th className="px-4 py-2.5 text-[13px] font-medium text-muted-foreground">
                Description
              </th>
              <th className="px-4 py-2.5 text-[13px] font-medium text-muted-foreground">
                Flag
              </th>
              <th className="px-4 py-2.5 text-[13px] font-medium text-muted-foreground">
                Alias
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr
                key={prop.name}
                className={
                  index < props.length - 1
                    ? "border-b border-border/40"
                    : undefined
                }
              >
                <td className="min-w-56 px-4 py-3.5 align-top">
                  <code className="font-mono text-[13px] font-medium text-foreground">
                    {prop.name}
                  </code>
                  <p className="max-w-md text-[13px] leading-5 text-muted-foreground">
                    {prop.description}
                  </p>
                </td>
                <td className="px-4 py-3.5 align-top">
                  <code className="inline-block rounded-[9px] bg-muted px-1.5 py-0.5 font-mono text-[12px] whitespace-nowrap text-foreground/80">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-3.5 align-top">
                  {prop.defaultValue !== undefined ? (
                    <code className="inline-block rounded-[9px] bg-muted px-1.5 py-0.5 font-mono text-[12px] whitespace-nowrap text-foreground/80">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span aria-hidden className="text-muted-foreground/50">
                      &mdash;
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

```

## File: packages/ui/src/components/badge.tsx
```
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }

```

## File: packages/ui/src/components/button-group.tsx
```
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"
import { Separator } from "@packmd/ui/components/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical:
          "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}

```

## File: packages/ui/src/components/button.tsx
```
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"
import { Loader } from "lucide-react"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/50 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  loadingTxt,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
    loadingTxt?: string
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <>
          <Loader className="size-3.5 animate-spin" />
          {loadingTxt && <span>{loadingTxt}</span>}
        </>
      ) : (
        props.children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }

```

## File: packages/ui/src/components/card.tsx
```
import * as React from "react"

import { cn } from "@packmd/ui/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## File: packages/ui/src/components/choice-select.tsx
```
"use client"

import { play } from "cuelume"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { cn } from "../lib/utils"

export interface ChoiceOption<T extends string = string> {
  id: T
  label: string
}

/**
 * The control the docs chrome uses to switch framework, package manager, or
 * client. On a wide viewport it's the flush tablist the docs have always used;
 * below `sm` — where a row of tabs would overflow — it collapses to the Base UI
 * select, styled to match CopyMenu's popup. One value, one handler, both
 * presentations; call sites supply data only.
 */
export function ChoiceSelect<T extends string>({
  label,
  options,
  value,
  onValueChange,
  align,
  className,
}: {
  /** Accessible name for the control, e.g. "Framework". */
  label: string
  options: readonly ChoiceOption<T>[]
  value: T
  onValueChange: (value: T) => void
  /** Which trigger edge the popup hangs from. `"end"` for a right-flush row. */
  align?: "start" | "end"
  className?: string
}) {
  const select = (next: T) => {
    onValueChange(next)
    play("bloom")
  }

  return (
    <>
      {/* Wide desktop: the flush tablist, bleeding to the header divider. */}
      <div
        role="tablist"
        aria-label={label}
        className={cn("hidden items-center sm:flex", className)}
      >
        {options.map((option) => {
          const selected = option.id === value
          return (
            <button
              key={option.id}
              role="tab"
              type="button"
              data-ignore-click
              aria-selected={selected}
              onClick={() => select(option.id)}
              className={cn(
                "relative shrink-0 p-2 text-[13px] transition-colors duration-150",
                selected
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-px h-px bg-foreground transition-opacity duration-150",
                  selected ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          )
        })}
      </div>

      {/* Below the threshold: the select, where the tabs would overflow. */}
      <Select<T>
        value={value}
        onValueChange={(next) => {
          if (next === null) return
          select(next)
        }}
      >
        <SelectTrigger
          aria-label={label}
          className={cn("my-1.5 min-w-0 sm:hidden", className)}
        >
          <SelectValue className="truncate">
            {(current: T | null) =>
              options.find((option) => option.id === current)?.label ?? label
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent align={align}>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

```

## File: packages/ui/src/components/click-spark.tsx
```
"use client"
import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import { useClickSound } from "../hooks/soundcn/use-click-sound"
import { resolveCssColor } from "../lib/utils"

interface ClickSparkProps {
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out"
  extraScale?: number
  children?: React.ReactNode
}

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}) => {
  const [click] = useClickSound()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    let resizeTimeout: ReturnType<typeof setTimeout>

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect()
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(parent)

    resizeCanvas()

    return () => {
      ro.disconnect()
      clearTimeout(resizeTimeout)
    }
  }, [])

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t
        case "ease-in":
          return t * t
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          return t * (2 - t)
      }
    },
    [easing]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) {
          return false
        }

        const progress = elapsed / duration
        const eased = easeFunc(progress)

        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx.strokeStyle = resolveCssColor(sparkColor)
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [sparkSize, sparkRadius, duration, easeFunc, extraScale, sparkColor])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    const isInteractive = target.closest(
      'a, button, [role="button"], input, textarea, select, label'
    )

    const isPlayingCopy = target.closest("[data-ignore-click]")

    if (isPlayingCopy) return

    if (isInteractive) {
      click()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const now = performance.now()

    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)
  }

  return (
    <div className="relative h-full w-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
      {children}
    </div>
  )
}

export default ClickSpark

```

## File: packages/ui/src/components/code-block.tsx
```
import { CopyButton } from "./copy-button"

export function CodeBlock({
  html,
  source,
  fileName,
}: {
  /** Pre-highlighted HTML produced on the server. Omit for a single-line command row. */
  html?: string
  /** Raw source, used for the copy button. */
  source: string
  /** File name shown in the header of a multi-line block. */
  fileName?: string
}) {
  if (!html) {
    return (
      <div className="not-typeset overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b bg-card py-0.5 pr-1.5 pl-4">
          <span className="font-mono text-xs text-muted-foreground">
            {fileName ?? ""}
          </span>
          <CopyButton text={source} />
        </div>
        <div className="p-4">
          <code className="font-mono text-[13px] break-all whitespace-pre-wrap text-foreground/90">
            {source}
          </code>
        </div>
      </div>
    )
  }

  return (
    <div className="not-typeset overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-card py-1 pr-1.5 pl-4">
        <span className="text-[12px] text-muted-foreground">
          {fileName ?? ""}
        </span>
        <CopyButton text={source} />
      </div>
      <div
        className="docs-code max-h-[480px] overflow-y-auto text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

```

## File: packages/ui/src/components/code-tabs.tsx
```
"use client"

import { ChoiceSelect } from "./choice-select"
import { usePreference } from "../hooks/use-preference"
import { CopyButton } from "./copy-button"

export interface CodeVariant {
  /** Short identifier, e.g. "react". */
  id: string
  /** Tab label, e.g. "React". */
  label: string
  /** File name shown above the code. */
  fileName: string
  /** Raw source, used for the copy button. */
  source: string
  /** Pre-highlighted HTML produced on the server. */
  html: string
}

export function CodeTabs({ variants }: { variants: CodeVariant[] }) {
  const [activeId, setActiveId] = usePreference(
    "framework",
    variants[0]?.id ?? "react",
    variants.map((variant) => variant.id)
  )
  const active = variants.find((v) => v.id === activeId) ?? variants[0]

  if (!active) return null

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between gap-2 border-b bg-card pr-1.5 pl-2">
        <ChoiceSelect
          label="Framework"
          options={variants}
          value={active.id}
          onValueChange={setActiveId}
        />
        <CopyButton text={active.source} />
      </div>
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-[12px] text-muted-foreground">
          {active.fileName}
        </span>
      </div>
      <div
        className="docs-code max-h-[480px] overflow-y-auto px-4 text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: active.html }}
      />
    </div>
  )
}

```

## File: packages/ui/src/components/collapsible.tsx
```
"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

## File: packages/ui/src/components/copy-button.tsx
```
"use client"

import { cn } from "../lib/utils"
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard"
import { Copy3 } from "reicon-react"

export function CopyButton({
  text,
  label,
  className,
  successLabel,
}: {
  text: string
  label?: string
  className?: string
  successLabel?: string
}) {
  const { copy, state } = useCopyToClipboard()

  return (
    <button
      type="button"
      aria-label={state === "done" ? "Copied" : (label ?? "Copy to clipboard")}
      onClick={() => copy(text)}
      data-ignore-click
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs text-muted-foreground transition-[color,transform] duration-150 ease-out hover:text-foreground active:translate-y-px motion-reduce:transition-none",
        className
      )}
    >
      <span className="grid size-[15px]">
        <Copy3
          aria-hidden
          weight={state === "done" ? "Filled" : "Outline"}
          className={cn(
            "col-start-1 row-start-1 size-[15px] transition-[opacity,filter] duration-200 ease-out motion-reduce:transition-none"
          )}
        />
      </span>
      {label ? (
        <span>{state === "done" ? successLabel || "Copied" : label}</span>
      ) : null}
    </button>
  )
}

```

## File: packages/ui/src/components/drawer.tsx
```
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@packmd/ui/lib/utils"

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerPrimitive.Root.Props & {
  showSwipeHandle?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 min-h-dvh bg-black/10 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-backdrop-filter:backdrop-blur-xs supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-start after:block after:shrink-0 after:rounded-full after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-24 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-24 active:cursor-grabbing",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            // Base.
            "group/drawer-popup pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] flex-col bg-popover text-sm text-popover-foreground transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords] data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b",
            // Nested.
            "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
            // Bleed.
            "after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:after:bottom-full",
            // Sizing.
            "[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]",
            // Stack.
            "[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
            // Transitions.
            "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            // Axis: y.
            "data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)",
            // Axis: x.
            "data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row",
            // Direction: down.
            "data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: up.
            "data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: left.
            "data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
            // Direction: right.
            "data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
            className
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none"
            )}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-0.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

## File: packages/ui/src/components/dropdown-menu.tsx
```
"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Check } from "reicon-react"

import { cn } from "@packmd/ui/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-[10px] px-1.5 py-1 text-sm outline-hidden select-none focus:bg-card focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-[10px] px-1.5 py-1 text-sm outline-hidden select-none focus:bg-card focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-card data-popup-open:text-accent-foreground data-open:bg-card data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-[10px] py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-card focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <Check className="size-3" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-[10px] py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-card focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

## File: packages/ui/src/components/empty.tsx
```
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-sm font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}

```

## File: packages/ui/src/components/field.tsx
```
"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"
import { Label } from "@packmd/ui/components/label"
import { Separator } from "@packmd/ui/components/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

```

## File: packages/ui/src/components/highlight.ts
```
import { codeToHtml, type BundledLanguage, type ThemeRegistration } from "shiki"

function monochrome(
  name: string,
  colors: {
    base: string
    strong: string
    muted: string
    faint: string
    bg: string
  }
): ThemeRegistration {
  const { base, strong, muted, faint, bg } = colors
  return {
    name,
    type: name.endsWith("dark") ? "dark" : "light",
    colors: {
      "editor.background": bg,
      "editor.foreground": base,
    },
    settings: [
      { settings: { foreground: base } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: faint },
      },
      {
        scope: [
          "string",
          "string.template",
          "punctuation.definition.string",
          "constant.numeric",
          "constant.language",
          "constant.character",
        ],
        settings: { foreground: muted },
      },
      {
        scope: [
          "keyword",
          "storage.type",
          "storage.modifier",
          "keyword.control",
          "keyword.operator.new",
          "keyword.operator.expression",
        ],
        settings: { foreground: strong },
      },
      {
        scope: [
          "entity.name.function",
          "entity.name.type",
          "entity.name.class",
          "entity.name.tag",
          "support.function",
          "support.class",
          "support.type",
        ],
        settings: { foreground: strong },
      },
      {
        scope: [
          "punctuation",
          "meta.brace",
          "keyword.operator",
          "punctuation.definition.tag",
        ],
        settings: { foreground: muted },
      },
      {
        scope: [
          "variable",
          "variable.parameter",
          "entity.other.attribute-name",
          "support.variable",
        ],
        settings: { foreground: base },
      },
    ],
  }
}

const monoLight = monochrome("canvas-mono-light", {
  base: "#404040",
  strong: "#0a0a0a",
  muted: "#737373",
  faint: "#a3a3a3",
  bg: "#ffffff",
})

const monoDark = monochrome("canvas-mono-dark", {
  base: "#b3b3b3",
  strong: "#fafafa",
  muted: "#8a8a8a",
  faint: "#595959",
  bg: "#0a0a0a",
})

export async function highlight(source: string, lang: BundledLanguage) {
  return codeToHtml(source, {
    lang,
    themes: {
      light: monoLight,
      dark: monoDark,
    },
    defaultColor: false,
  })
}

```

## File: packages/ui/src/components/icon-swap.tsx
```
"use client"

import type { AnimatePresenceProps, HTMLMotionProps } from "motion/react"
import { AnimatePresence, motion } from "motion/react"

export function IconSwap(props: React.PropsWithChildren<AnimatePresenceProps>) {
  return <AnimatePresence mode="popLayout" initial={false} {...props} />
}

type MotionElement = typeof motion.div | typeof motion.span

export function IconSwapItem({
  as: Component = motion.div,
  ...props
}: HTMLMotionProps<"div"> & {
  as?: MotionElement
}) {
  return (
    <Component
      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0,
      }}
      {...props}
    />
  )
}

```

## File: packages/ui/src/components/icons.tsx
```
type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  logo: (props: IconProps) => (
    <svg viewBox="0 0 246 246" fill="none" {...props}>
      <path
        d="M79.0184 123.213L46.0263 141.046L79.0184 158.879L123 182.656L166.982 158.879L199.974 141.046L166.982 123.213M79.0184 123.213L123 146.99L166.982 123.213M79.0184 123.213L46.0263 105.38L123 63.7704L199.974 105.38L166.982 123.213"
        stroke="currentColor"
        strokeWidth="12.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg {...props} viewBox="0 0 1200 1227">
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
        fill="currentColor"
      />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  npm: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
        fill="currentColor"
      />
    </svg>
  ),
  yarn: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.845 19.308c-1.268 .814 -2.41 1.254 -3.845 1.692c-.176 .21 -.645 .544 -.912 .588a42.469 42.469 0 0 1 -4.498 .412c-.812 .006 -1.31 -.214 -1.447 -.554c-.115 -.279 .336 -2.054 .298 -1.964c-.157 .392 -.575 1.287 -.997 1.72c-.579 .6 -1.674 .4 -2.322 .051c-.71 -.386 -.07 -1.28 -.346 -1.267c-.276 .014 -.776 -1.486 -.776 -2.236c0 -.828 .622 -1.674 1.235 -2.211a6.811 6.811 0 0 1 .46 -3.143a7.414 7.414 0 0 1 2.208 -2.615s-1.353 -1.534 -.849 -2.912c.328 -.902 .46 -.895 .567 -.935c.38 -.12 .727 -.33 1.013 -.612c.78 -.88 1.96 -1.438 3.116 -1.322c0 0 .781 -2.43 1.533 -1.936c.415 .653 .671 1.218 .967 1.936c0 0 1.15 -.7 1.25 -.5c.514 1.398 .487 3.204 .211 4.67c-.324 1.408 -.84 2.691 -1.711 3.83c-.094 .16 .98 .705 1.722 2.812c.686 1.928 .278 2.438 .278 2.688s.716 .144 2.296 -.855a5.848 5.848 0 0 1 2.984 -1.145c.735 -.066 .988 -.035 1.22 1c.232 1.035 -.346 1.406 -.744 1.506c0 0 -2.09 .675 -2.911 1.302z"
      />
    </svg>
  ),
  pnpm: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
        fill="currentColor"
      />
    </svg>
  ),
  bun: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083 5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z"
        fill="currentColor"
      />
    </svg>
  ),
  react: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
        fill="currentColor"
      />
    </svg>
  ),
  tailwind: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  ),
  json: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M7.99994 12H8.00891M11.9955 12H12.0044M15.991 12H15.9999"
        fill="currentColor"
      />
      <path
        d="M18 21C19.2322 21 20.231 19.8487 20.231 18.4286C20.231 16.1808 20.1312 14.6864 21.6733 12.9091C22.1089 12.407 22.1089 11.5929 21.6733 11.0908C20.1312 9.31353 20.231 7.81914 20.231 5.57141C20.231 4.15125 19.2322 2.99998 18 2.99998"
        fill="currentColor"
      />
      <path
        d="M6 21C4.76784 21 3.76897 19.8487 3.76897 18.4286C3.76897 16.1808 3.86877 14.6864 2.32673 12.9091C1.89109 12.407 1.89109 11.5929 2.32673 11.0908C3.83496 9.35249 3.76897 7.8399 3.76897 5.57141C3.76897 4.15125 4.76784 2.99998 6 2.99998"
        fill="currentColor"
      />
    </svg>
  ),
  js: (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
      />
    </svg>
  ),
  ts: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
      />
    </svg>
  ),
  css: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V0zM4.59 7.498q-.908 0-1.455.508-.547.507-.547 1.484v3.106q0 .986.527 1.484t1.406.498q.576 0 1.016-.224.45-.225.703-.674.255-.45.254-1.114v-.185h-1.22v.176q0 .449-.186.683t-.527.235q-.372-.01-.557-.264-.186-.255-.186-.752V9.686q0-.547.166-.811.177-.264.577-.264.321 0 .517.225.195.224.195.693v.205h1.23V9.52q0-.674-.243-1.124a1.55 1.55 0 0 0-.664-.673q-.42-.225-1.006-.225m4.214-.01q-.586 0-1.006.244a1.67 1.67 0 0 0-.635.674 2.1 2.1 0 0 0-.225.996q0 .753.293 1.182.304.42.967.732l.469.215q.44.186.625.43.186.244.186.635 0 .478-.166.703-.157.224-.528.224-.36 0-.547-.244-.185-.243-.205-.752H6.87q.02.996.498 1.524.479.527 1.387.527t1.416-.518.508-1.484q0-.81-.332-1.289-.333-.479-1.045-.79l-.45-.196q-.39-.166-.556-.381-.165-.214-.166-.576 0-.4.166-.596.175-.195.508-.195.36 0 .508.234.156.234.175.703h1.123q-.03-.976-.498-1.484-.468-.518-1.308-.518m4.057 0q-.585 0-1.006.244a1.67 1.67 0 0 0-.634.674 2.1 2.1 0 0 0-.225.996q0 .753.293 1.182.303.42.967.732l.469.215q.438.186.625.43.185.244.185.635 0 .478-.166.703-.156.224-.527.224-.361.001-.547-.244-.186-.243-.205-.752h-1.162q.02.996.498 1.524.479.527 1.386.527.909 0 1.417-.518.507-.517.507-1.484 0-.81-.332-1.289t-1.045-.79l-.449-.196q-.39-.166-.556-.381-.166-.214-.166-.576 0-.4.165-.596.177-.195.508-.195.361 0 .508.234.156.234.176.703h1.123q-.03-.976-.498-1.484-.47-.518-1.309-.518"
      />
    </svg>
  ),
  bash: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M21.038 4.9 13.461.402a2.86 2.86 0 0 0-2.923.001L2.961 4.9A3.023 3.023 0 0 0 1.5 7.503v8.995c0 1.073.557 2.066 1.462 2.603l7.577 4.497a2.86 2.86 0 0 0 2.922 0l7.577-4.497a3.023 3.023 0 0 0 1.462-2.603V7.503A3.021 3.021 0 0 0 21.038 4.9zM15.17 18.946l.013.646c.001.078-.05.167-.111.198l-.383.22c-.061.031-.111-.007-.112-.085l-.007-.635c-.328.136-.66.169-.872.084-.04-.016-.057-.075-.041-.142l.139-.584a.24.24 0 0 1 .069-.121.163.163 0 0 1 .036-.026c.022-.011.043-.014.062-.006.229.077.521.041.802-.101.357-.181.596-.545.592-.907-.003-.328-.181-.465-.613-.468-.55.001-1.064-.107-1.072-.917-.007-.667.34-1.361.889-1.8l-.007-.652c-.001-.08.048-.168.111-.2l.37-.236c.061-.031.111.007.112.087l.006.653c.273-.109.511-.138.726-.088.047.012.067.076.048.151l-.144.578a.255.255 0 0 1-.065.116.161.161 0 0 1-.038.028.083.083 0 0 1-.057.009c-.098-.022-.332-.073-.699.113-.385.195-.52.53-.517.778.003.297.155.387.681.396.7.012 1.003.318 1.01 1.023.007.689-.362 1.433-.928 1.888zm3.973-1.087c0 .06-.008.116-.058.145l-1.916 1.164c-.05.029-.09.004-.09-.056v-.494c0-.06.037-.093.087-.122l1.887-1.129c.05-.029.09-.004.09.056v.436zm1.316-11.062-7.168 4.427c-.894.523-1.553 1.109-1.553 2.187v8.833c0 .645.26 1.063.66 1.184a2.304 2.304 0 0 1-.398.039c-.42 0-.833-.114-1.197-.33L3.226 18.64a2.494 2.494 0 0 1-1.201-2.142V7.503c0-.881.46-1.702 1.201-2.142L10.803.863a2.342 2.342 0 0 1 2.394 0l7.577 4.498a2.479 2.479 0 0 1 1.164 1.732c-.252-.536-.818-.682-1.479-.296z"
        fill="currentColor"
      />
    </svg>
  ),
  svelte: (props: IconProps) => (
    <svg viewBox="0 0 256 308" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056 86.566 86.566 0 0 0 8.536 55.576 82.425 82.425 0 0 0-12.296 30.719 87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057 86.601 86.601 0 0 0-8.53-55.577 82.409 82.409 0 0 0 12.29-30.718 87.573 87.573 0 0 0-14.963-66.244"
        fill="var(--foreground)"
      />
      <path
        d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85 49.978 49.978 0 0 1 1.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 0 0 2.89 10.656 17.143 17.143 0 0 0 18.397 6.828 15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977 15.923 15.923 0 0 0-2.713-12.011 17.156 17.156 0 0 0-18.404-6.832 15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849 49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85 50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 0 0-2.89-10.656 17.143 17.143 0 0 0-18.398-6.828 15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975 15.9 15.9 0 0 0 2.709 12.012 17.156 17.156 0 0 0 18.404 6.832 15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848 49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398"
        fill="var(--background)"
      />
    </svg>
  ),
  vue: (props: IconProps) => (
    <svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"
        fill="var(--foreground)"
      />
      <path
        d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"
        fill="var(--foreground)"
      />
      <path
        d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"
        fill="var(--ring)"
      />
    </svg>
  ),
  file: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M8 17H16" fill="currentColor" />
      <path d="M8 13H12" fill="currentColor" />
      <path
        d="M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z"
        fill="currentColor"
      />
    </svg>
  ),
}

export function getIconForLanguageExtension(language: string) {
  const lang = language.toLowerCase()

  switch (lang) {
    case "json":
      return <Icons.json />

    case "css":
      return <Icons.css />

    case "js":
    case "jsx":
    case "javascript":
    case "mjs":
    case "cjs":
      return <Icons.js />

    case "ts":
    case "tsx":
    case "typescript":
      return <Icons.ts />

    case "svelte":
      return <Icons.svelte />

    case "vue":
      return <Icons.vue />

    case "bash":
      return <Icons.bash />

    default:
      return <Icons.file />
  }
}

```

## File: packages/ui/src/components/input-group.tsx
```
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"
import { Button } from "@packmd/ui/components/button"
import { Input } from "@packmd/ui/components/input"
import { Textarea } from "@packmd/ui/components/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-xl border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}

```

## File: packages/ui/src/components/input.tsx
```
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@packmd/ui/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## File: packages/ui/src/components/install-tabs.tsx
```
"use client"

import { usePreference } from "../hooks/use-preference"
import { ChoiceSelect } from "./choice-select"
import { CopyButton } from "./copy-button"

const MANAGERS = [
  { id: "bun", label: "bun", install: "bun add -g", run: "bunx" },
  { id: "npm", label: "npm", install: "npm install -g", run: "npx" },
  { id: "pnpm", label: "pnpm", install: "pnpm install -g", run: "pnpm dlx" },
  { id: "yarn", label: "yarn", install: "yarn add -g", run: "yarn dlx" },
] as const

const INSTALLATIONS = [
  { id: "global", label: "Global Install" },
  { id: "one-time", label: "One-Time Run" },
] as const

export const MANAGER_IDS = MANAGERS.map((manager) => manager.id)
export const INSTALLATION_IDS = INSTALLATIONS.map((framework) => framework.id)

export function buildInstallCommand(
  managerId: string,
  item: string,
  installationId: string
) {
  const manager = MANAGERS.find((m) => m.id === managerId) ?? MANAGERS[0]

  return installationId === "global"
    ? `${manager.install} ${item} && packmd <github_or_webpage_url>`
    : `${manager.run} ${item} <github_or_webpage_url>`
}

export function InstallTabs({ item }: { item: string }) {
  const [managerId, setManagerId] = usePreference("pm", "bun", MANAGER_IDS)
  const [installationId, setInstallationId] = usePreference(
    "installation",
    "global",
    INSTALLATION_IDS
  )

  const manager = MANAGERS.find((m) => m.id === managerId) ?? MANAGERS[0]
  const fullCommand = buildInstallCommand(manager.id, item, installationId)

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b bg-card px-2">
        <ChoiceSelect
          label="Package manager"
          options={MANAGERS}
          value={manager.id}
          onValueChange={setManagerId}
        />
        <ChoiceSelect
          label="Installation"
          options={INSTALLATIONS}
          value={installationId}
          onValueChange={setInstallationId}
          align="end"
        />
      </div>
      <div className="flex items-center justify-between gap-3 py-1.5 pr-1.5 pl-4">
        <code className="overflow-x-auto text-[13px] whitespace-nowrap text-foreground/90">
          {fullCommand}
        </code>
        <CopyButton text={fullCommand} />
      </div>
    </div>
  )
}

```

## File: packages/ui/src/components/label.tsx
```
"use client"

import * as React from "react"

import { cn } from "@packmd/ui/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

## File: packages/ui/src/components/popover.tsx
```
"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@packmd/ui/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex origin-(--transform-origin) flex-col gap-2.5 rounded-xl bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}

```

## File: packages/ui/src/components/reui/frame.tsx
```
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@packmd/ui/lib/utils"

/**
 * CSS variable architecture for FramePanel theming:
 *
 * The Frame parent sets --frame-panel-bg and --frame-panel-border-color.
 * FramePanel consumes them directly via bg-(--frame-panel-bg) and
 * border-(--frame-panel-border-color). This means:
 *
 *   - variant="inverse" overrides those vars on Frame → all panels pick it up
 *   - <FramePanel className="bg-blue-50"> adds a direct utility on the element
 *     which wins over bg-(--frame-panel-bg) by Tailwind source order — no
 *     :not() or !important needed
 */
const frameVariants = cva(
  [
    "relative flex flex-col gap-(--frame-gap) rounded-(--frame-radius) bg-muted/50 px-(--frame-px) py-(--frame-py)",
    "(--radius-xl)] [--frame-radius:var(--radius-xl)]",
    "(--radius-none)] (--radius-2xl)] (--radius-lg)] (--radius-none)]",
    "[--frame-gap:--spacing(0.75)] [--frame-panel-footer-gap:--spacing(1)] [--frame-panel-header-gap:0rem] [--frame-px:--spacing(0.75)] [--frame-py:--spacing(0.75)]",
    "[--frame-panel-footer-px-adjust:0px] [--frame-panel-footer-py-adjust:0px] [--frame-panel-header-px-adjust:0px] [--frame-panel-header-py-adjust:0px] [--frame-panel-px-adjust:0px] [--frame-panel-py-adjust:0px]",
    "[--frame-panel-footer-px:calc(var(--frame-panel-footer-px-base)_+_var(--frame-panel-footer-px-adjust))] [--frame-panel-footer-py:calc(var(--frame-panel-footer-py-base)_+_var(--frame-panel-footer-py-adjust))] [--frame-panel-header-px:calc(var(--frame-panel-header-px-base)_+_var(--frame-panel-header-px-adjust))] [--frame-panel-header-py:calc(var(--frame-panel-header-py-base)_+_var(--frame-panel-header-py-adjust))] [--frame-panel-px:calc(var(--frame-panel-px-base)_+_var(--frame-panel-px-adjust))] [--frame-panel-py:calc(var(--frame-panel-py-base)_+_var(--frame-panel-py-adjust))]",
    "(1)] (1)] (1.25)] (1.5)] (1.5)] (0.5)] (1)] (1)]",
    // Default panel token values — overridden per-variant below
    "[--frame-border-color:var(--color-border)] [--frame-panel-bg:var(--color-card)] [--frame-panel-border-color:var(--color-border)]",
  ],
  {
    variants: {
      variant: {
        default: "border border-[var(--frame-border-color)] bg-clip-padding",
        inverse:
          "border border-[var(--frame-border-color)] bg-background bg-clip-padding [--frame-panel-bg:color-mix(in_oklch,var(--color-muted)_40%,transparent)]",
        ghost: "",
      },
      // Header/footer vertical rhythm is tighter than the panel body's, and
      // the gap widens as the frame grows: the bars read as chrome rather than
      // as another content block. py ladder is 0.5 / 1.5 / 2 / 2.5 against a
      // body py of 2 / 3.5 / 4 / 5. These vars are style-agnostic - no
      // style-*.css overrides them - so this single ladder drives all shadcn
      // styles. `px` is deliberately left level with the body so header,
      // content and footer stay left-aligned. `xs` holds at 0.5 (2px): it is
      // the practical floor, since anything lower stops reading as padding.
      spacing: {
        xs: "[--frame-panel-footer-px-base:--spacing(2)] [--frame-panel-footer-py-base:--spacing(0.5)] [--frame-panel-header-px-base:--spacing(2)] [--frame-panel-header-py-base:--spacing(0.5)] [--frame-panel-px-base:--spacing(2)] [--frame-panel-py-base:--spacing(2)]",
        sm: "[--frame-panel-footer-px-base:--spacing(3)] [--frame-panel-footer-py-base:--spacing(1.5)] [--frame-panel-header-px-base:--spacing(3)] [--frame-panel-header-py-base:--spacing(1.5)] [--frame-panel-px-base:--spacing(3)] [--frame-panel-py-base:--spacing(3.5)]",
        default:
          "[--frame-panel-footer-px-base:--spacing(4)] [--frame-panel-footer-py-base:--spacing(2)] [--frame-panel-header-px-base:--spacing(4)] [--frame-panel-header-py-base:--spacing(2)] [--frame-panel-px-base:--spacing(4)] [--frame-panel-py-base:--spacing(4)]",
        lg: "[--frame-panel-footer-px-base:--spacing(5)] [--frame-panel-footer-py-base:--spacing(2.5)] [--frame-panel-header-px-base:--spacing(5)] [--frame-panel-header-py-base:--spacing(2.5)] [--frame-panel-px-base:--spacing(5)] [--frame-panel-py-base:--spacing(5)]",
      },
      stacked: {
        true: [
          "gap-0 *:has-[+[data-slot=frame-panel]]:rounded-b-none",
          "*:has-[+[data-slot=frame-panel]]:before:hidden",
          "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:rounded-t-none",
          "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:border-t-0",
        ],
        false: [
          "data-[spacing=sm]:*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-0.5",
          "data-[spacing=default]:*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1",
          "data-[spacing=lg]:*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-2",
        ],
      },
      dense: {
        // Positional rules must stay as parent selectors — cannot be expressed via CSS vars
        true: "gap-0 border-[var(--frame-border-color)] p-0 [&_[data-slot=frame-panel]]:-mx-px [&_[data-slot=frame-panel]]:before:hidden [&_[data-slot=frame-panel]:last-child]:-mb-px [&:not(:has([data-slot=frame-panel-header]))_[data-slot=frame-panel]:is(:first-child)]:-mt-px",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
      stacked: false,
      dense: false,
    },
  }
)

function Frame({
  className,
  variant,
  spacing,
  stacked,
  dense,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof frameVariants>) {
  return (
    <div
      className={cn(
        frameVariants({ variant, spacing, stacked, dense }),
        className
      )}
      data-slot="frame"
      data-spacing={spacing}
      {...props}
    />
  )
}

function FramePanel({
  className,
  fit,
  ...props
}: React.ComponentProps<"div"> & { fit?: boolean }) {
  return (
    <div
      className={cn(
        // bg-(--frame-panel-bg) and border-(--frame-panel-border-color) consume the
        // CSS vars set by the Frame parent. Any explicit bg-* or border-* class passed
        // via className overrides these by Tailwind source order - no ! needed.
        "relative overflow-hidden rounded-(--frame-radius) border border-(--frame-panel-border-color) bg-(--frame-panel-bg) bg-clip-padding shadow-xs",
        // `fit` sizes the panel to its content; otherwise it grows to fill the frame.
        !fit && "grow",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--frame-radius)-1px)] before:shadow-black/5",
        "dark:bg-clip-border dark:before:shadow-white/5",
        "px-(--frame-panel-px) py-(--frame-panel-py)",
        className
      )}
      data-slot="frame-panel"
      {...props}
    />
  )
}

function FrameHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "flex flex-col gap-(--frame-panel-header-gap) px-(--frame-panel-header-px) py-(--frame-panel-header-py)",
        className
      )}
      data-slot="frame-panel-header"
      {...props}
    />
  )
}

function FrameTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm font-semibold", className)}
      data-slot="frame-panel-title"
      {...props}
    />
  )
}

function FrameDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="frame-panel-description"
      {...props}
    />
  )
}

function FrameFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "flex flex-col gap-(--frame-panel-footer-gap) px-(--frame-panel-footer-px) py-(--frame-panel-footer-py)",
        className
      )}
      data-slot="frame-panel-footer"
      {...props}
    />
  )
}

export {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameFooter,
  frameVariants,
}

```

## File: packages/ui/src/components/reui/timeline.tsx
```
"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packmd/ui/lib/utils"

// Types
type TimelineContextValue = {
  activeStep: number
  setActiveStep: (step: number) => void
}

// Context
const TimelineContext = createContext<TimelineContextValue | undefined>(
  undefined
)

const useTimeline = () => {
  const context = useContext(TimelineContext)
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline")
  }
  return context
}

// Components
interface TimelineProps extends useRender.ComponentProps<"div"> {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  orientation?: "horizontal" | "vertical"
}

function Timeline({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "vertical",
  className,
  render,
  children,
  ...props
}: TimelineProps) {
  const [activeStep, setInternalStep] = useState(defaultValue)

  const setActiveStep = useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step)
      }
      onValueChange?.(step)
    },
    [value, onValueChange]
  )

  const currentStep = value ?? activeStep

  const defaultProps = {
    className: cn(
      "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
      className
    ),
    "data-orientation": orientation,
    "data-slot": "timeline",
    children,
  }

  return (
    <TimelineContext.Provider
      value={{ activeStep: currentStep, setActiveStep }}
    >
      {useRender({
        defaultTagName: "div",
        render,
        props: mergeProps<"div">(defaultProps, props),
      })}
    </TimelineContext.Provider>
  )
}

// TimelineContent
function TimelineContent({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn("text-muted-foreground text-sm", className),
    "data-slot": "timeline-content",
    children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

// TimelineDate
type TimelineDateProps = useRender.ComponentProps<"time">

function TimelineDate({
  className,
  render,
  children,
  ...props
}: TimelineDateProps) {
  const defaultProps = {
    className: cn(
      "mb-1 block font-medium text-muted-foreground text-xs group-data-[orientation=vertical]/timeline:max-sm:h-4",
      className
    ),
    "data-slot": "timeline-date",
    children,
  }

  return useRender({
    defaultTagName: "time",
    render,
    props: mergeProps<"time">(defaultProps, props),
  })
}

// TimelineHeader
function TimelineHeader({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn(className),
    "data-slot": "timeline-header",
    children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

// TimelineIndicator
type TimelineIndicatorProps = useRender.ComponentProps<"div">

function TimelineIndicator({
  className,
  children,
  render,
  ...props
}: TimelineIndicatorProps) {
  const defaultProps = {
    "aria-hidden": true,
    className: cn(
      "group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2 absolute size-4 rounded-full border-2 border-primary/20 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=horizontal]/timeline:left-0 group-data-completed/timeline-item:border-primary",
      className
    ),
    "data-slot": "timeline-indicator",
    children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

// TimelineItem
interface TimelineItemProps extends useRender.ComponentProps<"div"> {
  step: number
}

function TimelineItem({
  step,
  className,
  render,
  children,
  ...props
}: TimelineItemProps) {
  const { activeStep } = useTimeline()

  const defaultProps = {
    className: cn(
      "group/timeline-item relative flex flex-1 flex-col gap-0.5 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:not-last:pb-6 has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary",
      className
    ),
    "data-completed": step <= activeStep || undefined,
    "data-slot": "timeline-item",
    children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

// TimelineSeparator
function TimelineSeparator({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    "aria-hidden": true,
    className: cn(
      "group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2 absolute self-start bg-primary/10 group-last/timeline-item:hidden group-data-[orientation=horizontal]/timeline:h-0.5 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem-0.25rem)] group-data-[orientation=horizontal]/timeline:w-[calc(100%-1rem-0.25rem)] group-data-[orientation=vertical]/timeline:w-0.5 group-data-[orientation=horizontal]/timeline:translate-x-4.5 group-data-[orientation=vertical]/timeline:translate-y-4.5",
      className
    ),
    "data-slot": "timeline-separator",
    children,
  }

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  })
}

// TimelineTitle
function TimelineTitle({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<"h3">) {
  const defaultProps = {
    className: cn("font-medium text-sm", className),
    "data-slot": "timeline-title",
    children,
  }

  return useRender({
    defaultTagName: "h3",
    render,
    props: mergeProps<"h3">(defaultProps, props),
  })
}

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
}
```

## File: packages/ui/src/components/select.tsx
```
"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"

function Select<Value>(props: SelectPrimitive.Root.Props<Value>) {
  return <SelectPrimitive.Root {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "inline-flex h-7 cursor-pointer items-center justify-between gap-1.5 rounded-sm border border-transparent px-2.5 text-[13px] whitespace-nowrap text-muted-foreground transition-[color,background-color,transform] duration-150 ease-out outline-none select-none hover:bg-muted/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.97] data-popup-open:bg-muted/60 data-popup-open:text-foreground motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="shrink-0 transition-transform duration-150 ease-out data-popup-open:rotate-180 motion-reduce:transition-none">
        <ChevronDown aria-hidden className="size-3.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const SelectValue = SelectPrimitive.Value

function SelectContent({
  className,
  children,
  align = "start",
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="z-40 outline-none"
        // `mt-2` off the trigger, matching CopyMenu's popup.
        sideOffset={8}
        // Base UI defaults to overlaying the trigger so the selected item sits
        // under the cursor. The docs chrome reads better as a plain dropdown:
        // anchored below, edges flush with the trigger.
        alignItemWithTrigger={false}
        align={align}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "max-h-[var(--available-height)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto rounded-md border border-border/70 bg-background p-1 shadow-lg transition-[opacity,transform] duration-150 ease-out outline-none data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 motion-reduce:transition-none motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100",
            className
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors duration-100 outline-none select-none data-highlighted:bg-muted/60 data-highlighted:text-foreground data-selected:bg-muted/60 data-selected:font-medium data-selected:text-foreground",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }

```

## File: packages/ui/src/components/separator.tsx
```
"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@packmd/ui/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

## File: packages/ui/src/components/skeleton.tsx
```
import { cn } from "@packmd/ui/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

## File: packages/ui/src/components/sonner.tsx
```
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { Siren2, CheckSquare, InfoSquare, AlertTriangle } from "reicon-react"
import { Loader } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckSquare className="size-3.5" />,
        info: <InfoSquare className="size-3.5" />,
        warning: <Siren2 className="size-3.5" />,
        error: <AlertTriangle className="size-3.5" />,
        loading: <Loader className="size-3.5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

```

## File: packages/ui/src/components/tabs.tsx
```
"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@packmd/ui/lib/utils"

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative z-0 flex h-8 w-fit items-center justify-center rounded-sm px-1 py-0.5",
        "bg-card text-muted-foreground",
        "inset-ring-1 inset-ring-border/64",
        className
      )}
      {...props}
    />
  )
}

function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(
        "absolute bottom-0 left-0 -z-1 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) rounded-md bg-card transition-[width,translate] duration-200 ease-in-out",
        "inset-ring-1 inset-ring-foreground/10 dark:inset-ring-foreground/6",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "flex flex-1 shrink-0 items-center justify-center gap-2 rounded-[10px] px-2 py-1 font-sans text-sm font-medium whitespace-nowrap transition-[color,background-color] outline-none hover:text-foreground focus-visible:inset-ring-1 focus-visible:inset-ring-ring disabled:pointer-events-none disabled:opacity-50 data-active:border data-active:bg-background data-active:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger }

```

## File: packages/ui/src/components/textarea.tsx
```
import * as React from "react"

import { cn } from "@packmd/ui/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

## File: packages/ui/src/components/tooltip.tsx
```
"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@packmd/ui/lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:right-2 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

## File: packages/ui/src/hooks/soundcn/use-click-sound.ts
```
"use client"

import { clickSoftSound } from "@packmd/ui/lib/soundcn/click-soft"
import { useSound } from "./use-sound"

export function useClickSound() {
  return useSound(clickSoftSound, { volume: 0.3 })
}

```

## File: packages/ui/src/hooks/soundcn/use-sound.ts
```
"use client"

import {
  decodeAudioData,
  getAudioContext,
} from "@packmd/ui/lib/soundcn/sound-engine"
import {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
} from "@packmd/ui/lib/soundcn/sound-types"
import { useReducedMotion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {}
): UseSoundReturn {
  const {
    volume = 0.5,
    playbackRate = 1,
    interrupt = false,
    soundEnabled: _soundEnabled = true,
    onPlay,
    onEnd,
    onPause,
    onStop,
  } = options

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<number | null>(
    sound.duration || null
  )
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  const shouldReduceMotion = useReducedMotion()
  const soundEnabled = _soundEnabled && !shouldReduceMotion

  useEffect(() => {
    let cancelled = false
    decodeAudioData(sound.dataUri).then((buffer) => {
      if (!cancelled) {
        bufferRef.current = buffer
        setDuration(buffer.duration)
      }
    })
    return () => {
      cancelled = true
    }
  }, [sound.dataUri])

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop()
      } catch {
        // Already stopped
      }
      sourceRef.current = null
    }
    setIsPlaying(false)
    onStop?.()
  }, [onStop])

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled || !bufferRef.current) return

      const ctx = getAudioContext()

      if (ctx.state === "suspended") {
        ctx.resume()
      }

      if (interrupt && sourceRef.current) {
        stop()
      }

      const source = ctx.createBufferSource()
      const gain = ctx.createGain()

      source.buffer = bufferRef.current
      source.playbackRate.value = overrides?.playbackRate ?? playbackRate
      gain.gain.value = overrides?.volume ?? volume

      source.connect(gain)
      gain.connect(ctx.destination)

      source.onended = () => {
        setIsPlaying(false)
        onEnd?.()
      }

      source.start(0)
      sourceRef.current = source
      gainRef.current = gain
      setIsPlaying(true)
      onPlay?.()
    },
    [soundEnabled, playbackRate, volume, interrupt, stop, onPlay, onEnd]
  )

  const pause = useCallback(() => {
    stop()
    onPause?.()
  }, [stop, onPause])

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume
    }
  }, [volume])

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try {
          sourceRef.current.stop()
        } catch {
          // Already stopped
        }
      }
    }
  }, [])

  return [play, { stop, pause, isPlaying, duration, sound }] as const
}

```

## File: packages/ui/src/hooks/use-copy-to-clipboard.ts
```
"use client"

import { useCallback, useRef, useState } from "react"
import { useTiks } from "@rexa-developer/tiks/react"
import { useWebHaptics } from "web-haptics/react"

export type CopyState = "idle" | "done" | "error"

export type UseCopyToClipboardOptions = {
  onCopySuccess?: (text: string) => void
  onCopyError?: (error: Error) => void
  resetDelay?: number
}

export function useCopyToClipboard({
  onCopySuccess,
  onCopyError,
  resetDelay = 1500,
}: UseCopyToClipboardOptions = {}) {
  const [state, setState] = useState<CopyState>("idle")
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { trigger: haptic } = useWebHaptics()
  const { success: tiksSuccess, error: tiksError } = useTiks()

  const copy = useCallback(
    async (text: string | (() => string)) => {
      // Clear any pending reset
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }

      try {
        const finalText = typeof text === "function" ? text() : text
        await navigator.clipboard.writeText(finalText)

        setState("done")

        haptic("success")
        tiksSuccess()

        onCopySuccess?.(finalText)
      } catch (error) {
        setState("error")

        haptic("error")
        tiksError()

        onCopyError?.(error instanceof Error ? error : new Error("Copy failed"))
      } finally {
        // Schedule reset to idle
        resetTimeoutRef.current = setTimeout(() => {
          setState("idle")
        }, resetDelay)
      }
    },
    [onCopySuccess, onCopyError, haptic, tiksSuccess, tiksError, resetDelay]
  )

  return { state, copy } as const
}

```

## File: packages/ui/src/hooks/use-is-mobile.ts
```
"use client"
import React from "react"

// Media query hook to detect mobile viewport
export function useIsMobile(value?: string) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(${value || "max-width: 767px"})`)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener("change", onChange)
    setIsMobile(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

```

## File: packages/ui/src/hooks/use-preference.ts
```
"use client"

import { useCallback, useSyncExternalStore } from "react"

const EVENT = "packmd:pref"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(EVENT, callback)
  }
}

export function usePreference<T extends string>(
  key: string,
  fallback: T,
  valid: readonly T[]
): [T, (value: T) => void] {
  const storageKey = `packmd:${key}`

  const value = useSyncExternalStore(
    subscribe,
    () => {
      const stored = window.localStorage.getItem(storageKey)
      return stored !== null && (valid as readonly string[]).includes(stored)
        ? (stored as T)
        : fallback
    },
    () => fallback
  )

  const setValue = useCallback(
    (next: T) => {
      window.localStorage.setItem(storageKey, next)
      window.dispatchEvent(new Event(EVENT))
    },
    [storageKey]
  )

  return [value, setValue]
}

```

## File: packages/ui/src/lib/soundcn/click-soft.ts
```
import type { SoundAsset } from "./sound-types"

export const clickSoftSound: SoundAsset = {
  name: "click-soft",
  dataUri:
    "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/+1DAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAIAAAJxAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr//////////////////////////////////////////////////////////////////wAAAABMYXZjNjIuMTEAAAAAAAAAAAAAAAAkBYYAAAAAAAACcU7MYgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tQxAAACghZUlTHgAGDlWufHzAAAVWgJg3EszX3mlF95pSk7enve+GBDEMNMg4R8BLACwAsA7BVjjOhDEMQxWKx5EcJwfB/KBiU8/wI7QH+BHaA/ynv6PB8/LgQEMgD78CHO/oGiAIBAQBAYFAA1hDi4z22DmJ7Et+PSEd1f8Y4PmLI5uDYKAWyCmBlSZJ3gAmD0RBEUDS/HKFzC5iZIr/5FTIvE0Yl3/8ipkXi8Yl0u/xEFQVER7/WCoiCoKiL/4VBURPOqgAQuacbblgZh//7UsQEg8aUBv9cMIAgAAA0gAAABIKqErhFDZUNQ7PRK4S8s8r1HiuGlHuSnenrcW9yvO/PcFflep5XqPKfrO9NTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
  duration: 0.007,
  format: "mp3",
  license: "CC0",
  author: "Kenney",
}

```

## File: packages/ui/src/lib/soundcn/laser-small-001.ts
```
import type { SoundAsset } from "./sound-types"

export const laserSmall001Sound: SoundAsset = {
  name: "laser-small-001",
  dataUri:
    "data:audio/mpeg;base64,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",
  duration: 0.244,
  format: "mp3",
  license: "CC0",
  author: "Kenney",
}

```

## File: packages/ui/src/lib/soundcn/metal-click.ts
```
import type { SoundAsset } from "./sound-types"

export const metalClickSound: SoundAsset = {
  name: "metal-click",
  dataUri:
    "data:audio/mpeg;base64,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",
  duration: 0.446,
  format: "mp3",
  license: "CC0",
  author: "Kenney",
}

```

## File: packages/ui/src/lib/soundcn/sound-engine.ts
```
let audioContext: AudioContext | null = null
const bufferCache = new Map<string, AudioBuffer>()

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

export async function decodeAudioData(dataUri: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(dataUri)
  if (cached) return cached

  const ctx = getAudioContext()
  const base64 = dataUri.split(",")[1]
  const binaryString = atob(base64 as string)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const audioBuffer = await ctx.decodeAudioData(bytes.buffer.slice(0))
  bufferCache.set(dataUri, audioBuffer)
  return audioBuffer
}

export interface PlaySoundOptions {
  volume?: number
  playbackRate?: number
  onEnd?: () => void
}

export interface SoundPlayback {
  stop: () => void
}

export async function playSound(
  dataUri: string,
  options: PlaySoundOptions = {}
): Promise<SoundPlayback> {
  const { volume = 1, playbackRate = 1, onEnd } = options
  const ctx = getAudioContext()
  if (ctx.state === "suspended") {
    await ctx.resume()
  }

  const buffer = await decodeAudioData(dataUri)
  const source = ctx.createBufferSource()
  const gain = ctx.createGain()

  source.buffer = buffer
  source.playbackRate.value = playbackRate
  gain.gain.value = volume

  source.connect(gain)
  gain.connect(ctx.destination)

  source.onended = () => {
    onEnd?.()
  }

  source.start(0)

  return {
    stop: () => {
      try {
        source.stop()
      } catch {
        // No-op if already stopped.
      }
    },
  }
}

```

## File: packages/ui/src/lib/soundcn/sound-types.ts
```
export interface SoundAsset {
  /** Unique identifier for the sound */
  name: string
  /** Base64-encoded data URI (data:audio/mpeg;base64,...) */
  dataUri: string
  /** Duration in seconds */
  duration: number
  /** Audio format */
  format: "mp3" | "wav" | "ogg"
  /** License identifier */
  license: "CC0" | "OGA-BY" | "MIT"
  /** Original author/creator */
  author: string
}

export interface UseSoundOptions {
  /** Volume level from 0 to 1. Default: 1 */
  volume?: number
  /** Playback speed multiplier. Default: 1 */
  playbackRate?: number
  /** If true, calling play() stops current playback first. Default: false */
  interrupt?: boolean
  /** If false, play() does nothing. Useful for user preferences. Default: true */
  soundEnabled?: boolean
  /** Called when playback starts */
  onPlay?: () => void
  /** Called when playback ends naturally */
  onEnd?: () => void
  /** Called when pause() is called */
  onPause?: () => void
  /** Called when stop() is called */
  onStop?: () => void
}

export type PlayFunction = (overrides?: {
  volume?: number
  playbackRate?: number
}) => void

export interface SoundControls {
  stop: () => void
  pause: () => void
  isPlaying: boolean
  duration: number | null
  sound: SoundAsset
}

export type UseSoundReturn = readonly [PlayFunction, SoundControls]

```

## File: packages/ui/src/lib/soundcn/u-mini-map-open.ts
```
import type { SoundAsset } from "./sound-types"

export const uMiniMapOpenSound: SoundAsset = {
  name: "u-mini-map-open",
  dataUri:
    "data:audio/mpeg;base64,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",
  duration: 0.482,
  format: "mp3",
  license: "CC0",
  author: "Kenney",
}

```

## File: packages/ui/src/lib/utils.ts
```
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveCssColor(color: string) {
  if (!color.startsWith("var(")) return color

  const variable = color.slice(4, -1).trim()

  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
}

```

## File: packages/ui/src/styles/globals.css
```
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));
@source "../../../apps/**/*.{ts,tsx}";
@source "../../../components/**/*.{ts,tsx}";
@source "../**/*.{ts,tsx}";

:root {
  --background: oklch(0.9851 0 0);
  --foreground: oklch(0.1408 0.0044 285.8229);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1408 0.0044 285.8229);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.1408 0.0044 285.8229);
  --primary: oklch(0.5651 0.172 273.874);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(94.912% 0.00011 271.152);
  --secondary-foreground: oklch(0.2103 0.0059 285.8852);
  --muted: oklch(0.9674 0.0013 286.3752);
  --muted-foreground: oklch(0.5517 0.0138 285.9385);
  --accent: oklch(0.9574 0.0175 279.0597);
  --accent-foreground: oklch(0.5651 0.172 273.874);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(0.9851 0 0);
  --border: oklch(0.9197 0.004 286.3202);
  --input: oklch(0.9197 0.004 286.3202);
  --ring: oklch(0.5651 0.172 273.874);

  --shadow-x: 0px;
  --shadow-y: 4px;
  --shadow-blur: 10px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;

  --shadow-color: #000000;
  --shadow-2xs: 0px 4px 10px -3px hsl(0 0% 0% / 0.03);
  --shadow-xs: 0px 4px 10px -3px hsl(0 0% 0% / 0.03);
  --shadow-sm:
    0px 4px 10px -3px hsl(0 0% 0% / 0.05), 0px 1px 2px -4px hsl(0 0% 0% / 0.05);
  --shadow:
    0px 4px 10px -3px hsl(0 0% 0% / 0.05), 0px 1px 2px -4px hsl(0 0% 0% / 0.05);
  --shadow-md:
    0px 4px 10px -3px hsl(0 0% 0% / 0.05), 0px 2px 4px -4px hsl(0 0% 0% / 0.05);
  --shadow-lg:
    0px 4px 10px -3px hsl(0 0% 0% / 0.05), 0px 4px 6px -4px hsl(0 0% 0% / 0.05);
  --shadow-xl:
    0px 4px 10px -3px hsl(0 0% 0% / 0.05), 0px 8px 10px -4px hsl(0 0% 0% / 0.05);
  --shadow-2xl: 0px 4px 10px -3px hsl(0 0% 0% / 0.13);
  --code: oklch(0.985 0 0);
  --code-foreground: oklch(0.141 0.005 285.823);
}

.dark {
  --background: oklch(0.1645 0.0086 274.3354);
  --foreground: oklch(0.9851 0 0);
  --card: oklch(0.1919 0.0126 270.684);
  --card-foreground: oklch(0.9851 0 0);
  --popover: oklch(0.1645 0.0086 274.3354);
  --popover-foreground: oklch(0.9851 0 0);
  --primary: oklch(0.5651 0.172 273.874);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.2393 0.0142 266.9746);
  --secondary-foreground: oklch(0.9851 0 0);
  --muted: oklch(0.2393 0.0142 266.9746);
  --muted-foreground: oklch(0.7118 0.0129 286.0665);
  --accent: oklch(0.2744 0.0717 275.1525);
  --accent-foreground: oklch(0.9851 0 0);
  --destructive: oklch(0.5945 0.1911 25.1414);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.2393 0.0142 266.9746);
  --input: oklch(0.2393 0.0142 266.9746);
  --ring: oklch(0.5651 0.172 273.874);

  --shadow-x: 0px;
  --shadow-y: 6px;
  --shadow-blur: 15px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.3;

  --shadow-color: #000000;
  --shadow-2xs: 0px 6px 12px -4px hsl(0 0% 0% / 0.2);
  --shadow-xs: 0px 6px 12px -4px hsl(0 0% 0% / 0.2);
  --shadow-sm:
    0px 6px 12px -4px hsl(0 0% 0% / 0.4), 0px 1px 2px -5px hsl(0 0% 0% / 0.4);
  --shadow:
    0px 6px 12px -4px hsl(0 0% 0% / 0.4), 0px 1px 2px -5px hsl(0 0% 0% / 0.4);
  --shadow-md:
    0px 6px 12px -4px hsl(0 0% 0% / 0.4), 0px 2px 4px -5px hsl(0 0% 0% / 0.4);
  --shadow-lg:
    0px 6px 12px -4px hsl(0 0% 0% / 0.4), 0px 4px 6px -5px hsl(0 0% 0% / 0.4);
  --shadow-xl:
    0px 6px 12px -4px hsl(0 0% 0% / 0.4), 0px 8px 10px -5px hsl(0 0% 0% / 0.4);
  --shadow-2xl: 0px 6px 12px -4px hsl(0 0% 0% / 1);
  --code: oklch(0.21 0.006 285.885);
  --code-foreground: oklch(0.985 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius: 1rem;

  --tracking-normal: 0.01em;
  --spacing: 0.3rem;

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);

  --animate-glow: glow 2.5s ease-in-out infinite;
  --animate-glow-spin: glow-spin 8s linear infinite;
  --color-code: var(--code);
  --color-code-foreground: var(--code-foreground);
}

@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 10px oklch(from var(--primary) l c h / var(--glow-opacity));
  }

  50% {
    box-shadow: 0 0 25px oklch(from var(--primary) l c h / var(--glow-opacity));
  }
}

@keyframes glow-error {
  0%,
  100% {
    box-shadow: 0 0 10px
      oklch(from var(--destructive) l c h / var(--glow-opacity));
  }

  50% {
    box-shadow: 0 0 25px
      oklch(from var(--destructive) l c h / var(--glow-opacity));
  }
}

@utility glow-pulse {
  --glow-opacity: 0.35;
  animation: glow-pulse 2.5s ease-in-out infinite;
}

@utility glow-error {
  --glow-opacity: 0.35;
  animation: glow-error 2.5s ease-in-out infinite;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    letter-spacing: var(--tracking-normal);
  }
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

```

## File: packages/ui/tsconfig.json
```
{
  "extends": "@packmd/tsconfig/react-library.json",
  "compilerOptions": {
    "paths": {
      "@packmd/ui/*": ["./src/*"]
    },
    "moduleResolution": "bundler",
    "module": "preserve"
  },
  "include": ["."],
  "exclude": ["node_modules", "dist"]
}

```

## File: packages/ui/tsconfig.lint.json
```
{
  "extends": "@packmd/tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src", "turbo"],
  "exclude": ["node_modules", "dist"]
}

```

## File: tsconfig.json
```
{
  "extends": "@packmd/tsconfig/base.json"
}

```

## File: turbo.json
```
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "globalEnv": [
    "JINA_API_KEY"
  ],
  "tasks": {
    "build": {
      "dependsOn": [
        "^build"
      ],
      "inputs": [
        "$TURBO_DEFAULT$",
        ".env*"
      ],
      "outputs": [
        ".next/**",
        "!.next/cache/**"
      ]
    },
    "lint": {
      "dependsOn": [
        "^lint"
      ]
    },
    "format": {
      "dependsOn": [
        "^format"
      ]
    },
    "typecheck": {
      "dependsOn": [
        "^typecheck"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false,
      "persistent": true
    }
  }
}
```