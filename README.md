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
