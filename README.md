## git2txt

Convert any GitHub repository into a clean, structured, and LLM-ready text digest.

### Overview

**git2txt** is a web-based tool that fetches a GitHub repository, processes its contents, and transforms it into a single, well-structured text output optimized for use with large language models (LLMs).

It provides:

- A summarized overview of the repository
- A directory tree structure
- Full file contents (with syntax highlighting)
- A downloadable `.txt` digest

---

### Features

**1. Repository Digesting**

- Accepts public or private GitHub repositories
- Parses repository structure and files
- Filters files based on size, count, and patterns

**2. LLM-Ready Output**

- Produces a clean, prompt-friendly text format
- Includes:
  - Summary (metadata, stats)
  - Directory structure
  - File contents

**3. Interactive UI**

- Built with Next.js (App Router)
- Tab-based interface:
  - **Summary**
  - **Directory Tree**
  - **Files Content**
- Expand/collapse file previews
- Syntax-highlighted code blocks

**4. Streaming API**

- Uses Server-Sent Events (SSE) for real-time progress updates
- Provides feedback during processing

**5. Download & Copy**

- Copy digest directly to clipboard
- Download as `.txt` file

---

### Architecture

**Frontend**

- Next.js (App Router)
- Tailwind CSS + shadcn/ui components
- Custom hooks for state management (`useDigest`)

**Backend (API Route)**

- `/api/digest`
- Streams progress using SSE
- Fetches repository data via GitHub API

**Core Logic**

Located in `/lib`:

- `github.ts` → Fetches repo data
- `buildTree.ts` → Generates directory structure
- `formatter.ts` → Formats final digest
- `highlighter.ts` → Syntax highlighting
- `parseRepoUrl.ts` → Parses user input

---

### How It Works

- User inputs a GitHub repository URL
- The app parses the repo (owner/repo)
- API route fetches repository data
- Files are filtered and processed
- A structured digest is generated
- UI displays:
  - Summary
  - Tree
  - Files
- User can copy or download the result

---

### Advanced Options

Users can configure:

- Max file size (KB)
- Max number of files
- Include patterns (glob)
- Exclude patterns (glob)
- GitHub Personal Access Token (for private repos)

---

### Security

- GitHub tokens are sent **only** to GitHub API
- No persistent storage of sensitive data
- Runs entirely in the browser (frontend-driven)

---

### Use Cases

- Preparing repositories for LLM analysis
- Codebase summarization
- Documentation generation
- AI-assisted code reviews

---

### Tech Stack

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- TypeScript
- GitHub REST API

---

### License

MIT © [Holiday](https://github.com/thelastofinusa)
