import React from "react"
import { HeroComp } from "@/components/hero"
import { Separator } from "@packmd/ui/components/separator"
import { Frame } from "@packmd/ui/components/reui/frame"
import { BoltLightning, Earth } from "reicon-react"
import { MaxContainer } from "@/components/max-container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@packmd/ui/components/accordion"
import { InstallTabs } from "@packmd/ui/components/install-tabs"
import { CodeBlock } from "@packmd/ui/components/code-block"
import { ApiProp, ApiReference } from "@packmd/ui/components/api-reference"
import { siteConfig } from "@/config/site.config"
import { Metadata } from "next"
import { TOTAL_DAYS } from "@/hooks/use-history"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "PackMD converts GitHub repos, local folders, and webpages into clean, LLM-ready Markdown — cutting the tokens an AI needs to understand your project. Learn the CLI, API, and processing pipeline.",
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
      "PackMD converts GitHub repos, local folders, and webpages into clean, LLM-ready Markdown — cutting the tokens an AI needs to understand your project. Learn the CLI, API, and processing pipeline.",
    url: "/docs",
  },
  twitter: {
    title: "Documentation",
    description:
      "PackMD converts GitHub repos, local folders, and webpages into clean, LLM-ready Markdown — cutting the tokens an AI needs to understand your project. Learn the CLI, API, and processing pipeline.",
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
    name: "no-gitignore",
    type: "--no-gitignore",
    description:
      "Don't respect .gitignore rules when scanning a local directory",
  },
]

const basicUsageCode = `# Pack a GitHub repository or remote web page into clean Markdown
packmd ${siteConfig.links.github} -o digest-pack.md -m 300
packmd ${siteConfig.url} --copy`

const localUsageCode = `# Digest the current directory
packmd .

# Combine advanced options: cap files, exclude tests, copy to clipboard
packmd facebook/react --max-files 300 --exclude "*.test.js" --copy

# Skip .gitignore rules when scanning a local directory
packmd . --no-gitignore`

const sections = [
  {
    id: "what-is-packmd",
    title: "What is PackMD?",
    content: (
      <>
        <p className="text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
          LLMs process Markdown far better than raw source code or HTML. Instead
          of forcing an AI to crawl file-by-file or parse messy DOMs—burning
          tokens on boilerplate and navigation—PackMD does the heavy lifting
          upfront.
        </p>
        <p className="mt-3 text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
          It aggregates your entire GitHub repo, local folder, or webpage into
          one clean, structured digest optimized specifically for AI
          consumption.
        </p>
      </>
    ),
  },
  {
    id: "overview",
    title: "Overview & Engine",
    content: (
      <>
        <p className="text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
          Under the hood, PackMD uses high‑performance filesystem traversal and
          modern web scraping APIs to construct the perfect context window.
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 pt-2 md:grid-cols-2">
          <Frame variant="inverse" className="rounded-xl">
            <div className="h-full space-y-2 rounded-lg border bg-card p-4">
              <h3 className="flex items-center gap-2 text-base font-medium">
                <BoltLightning className="size-3.5" />
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
                <Earth className="size-3.5" />
                <span>Web Pages</span>
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
    title: "CLI Usage",
    content: (
      <>
        <p className="text-sm leading-relaxed font-extralight text-muted-foreground sm:text-base">
          Run PackMD instantly from your terminal or plug it into our web
          interface for live previews and instant clipboard copying.
        </p>
        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground sm:text-base">
              Installation
            </span>
            <Frame variant="inverse" className="rounded-xl">
              <InstallTabs item="packmd" />
            </Frame>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground sm:text-base">
              Usage
            </span>
            <Frame variant="inverse" className="rounded-xl">
              <CodeBlock fileName="~terminal" source={basicUsageCode} />
            </Frame>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground sm:text-base">
              Local Directories & Advanced Usage
            </span>
            <p className="text-xs leading-relaxed font-extralight text-muted-foreground sm:text-sm">
              PackMD isn't limited to remote URLs — point it at any local
              directory, and combine flags to fine-tune exactly what gets
              included.
            </p>
            <Frame variant="inverse" className="rounded-xl">
              <CodeBlock fileName="~terminal" source={localUsageCode} />
            </Frame>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground sm:text-base">
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
    id: "pipeline",
    title: "Processing Pipeline",
    content: (
      <Frame variant="inverse" className="mt-2 rounded-xl">
        <Accordion
          multiple={false}
          defaultValue={["pipeline-1"]}
          className="overflow-hidden rounded-lg border"
        >
          {[
            {
              label: "URL Detection & Parsing",
              content:
                "Identifies whether the input is a GitHub repository or a standard webpage.",
            },
            {
              label: "Content Discovery & Fetching",
              content:
                "Collects repository files or extracts the main content from webpages.",
            },
            {
              label: "Filtering & File Selection",
              content:
                "Applies ignore rules, glob patterns, and file size limits before processing.",
            },
            {
              label: "Parallel File Downloads",
              content:
                "Downloads eligible files concurrently for faster processing.",
            },
            {
              label: "Directory Tree Construction",
              content:
                "Builds a structured file tree to preserve the project's organization.",
            },
            {
              label: "LLM-Ready Markdown Generation",
              content:
                "Converts the collected content into clean, well-structured Markdown.",
            },
          ].map((pipeline, index) => (
            <AccordionItem
              key={pipeline.label}
              value={`pipeline-${index + 1}`}
              className="**:data-[slot=accordion-content]:p-0! data-open:bg-muted/50"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                {pipeline.label}
              </AccordionTrigger>
              <AccordionContent className="px-4! pt-0 pb-4">
                <p className="text-sm text-muted-foreground">
                  {pipeline.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Frame>
    ),
  },
  {
    id: "faq",
    title: "FAQ & Troubleshooting",
    content: (
      <Frame variant="inverse" className="mt-2 rounded-xl">
        <Accordion
          multiple={false}
          defaultValue={["faq-1"]}
          className="overflow-hidden rounded-lg border"
        >
          {[
            {
              label: "Why am I getting rate limited?",
              content: () => (
                <p className="text-sm text-muted-foreground">
                  Unauthenticated GitHub requests are capped at 60/hour. Pass a
                  Personal Access Token with <code>--token</code> to raise this
                  to 5,000/hour.
                </p>
              ),
            },
            {
              label: "Can I digest private repos?",
              content: () => (
                <p className="text-sm text-muted-foreground">
                  Yes — provide a PAT with <code>repo</code> scope via{" "}
                  <code>--token</code> and PackMD will authenticate on your
                  behalf.
                </p>
              ),
            },
            {
              label: "Is my history saved anywhere else?",
              content: () => (
                <p className="text-sm text-muted-foreground">
                  No. Digest history lives only in your browser's IndexedDB and
                  expires automatically after {TOTAL_DAYS} days.
                </p>
              ),
            },
            {
              label: "A file I expected is missing from the output",
              content: () => (
                <p className="text-sm text-muted-foreground">
                  Check your <code>.gitignore</code>, <code>--exclude</code>{" "}
                  globs, and <code>--max-file-size</code> — files over the size
                  threshold are skipped by default.
                </p>
              ),
            },
          ].map((faq, index) => (
            <AccordionItem
              key={faq.label}
              value={`faq-${index + 1}`}
              className="**:data-[slot=accordion-content]:p-0! data-open:bg-muted/50"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                {faq.label}
              </AccordionTrigger>
              <AccordionContent className="px-4! pt-0 pb-4">
                {faq.content()}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Frame>
    ),
  },
]

export default function DocsPage() {
  return (
    <section className="h-full overflow-x-clip">
      <div className="py-8 md:pb-24">
        <HeroComp
          comment="Documentation"
          title="Generate AI-Ready Markdown"
          description="Pack codebases, local directories, and live web pages into clean, token-efficient context windows."
        />

        <Separator orientation="horizontal" className="my-8" />

        {/* ----- Loop through sections ----- */}
        {sections.map((section) => (
          <MaxContainer
            key={section.id}
            size="md"
            className="mb-16 last-of-type:mb-0"
          >
            <section id={section.id} className="flex flex-col gap-2">
              <h2 className="flex items-center gap-1 text-lg font-medium sm:text-xl">
                <span>{section.title}</span>
              </h2>
              {section.content}
            </section>
          </MaxContainer>
        ))}
      </div>
    </section>
  )
}
