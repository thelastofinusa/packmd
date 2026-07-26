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
