export const SOCIALS = [
  {
    platform: "Medium",
    name: "Holiday",
    username: "@thelastofinusa",
    url: "https://thelastofinusa.medium.com/your-ai-is-only-as-good-as-the-context-you-give-it-0a60d8dc898d",
  },
  {
    platform: "Product Hunt",
    name: "PackMD",
    username: "@thelastofinusa",
    url: "https://www.producthunt.com/products/packmd",
  },
  {
    platform: "npm",
    name: "PackMD",
    username: "@thelastofinusa",
    url: "https://www.npmjs.com/package/packmd",
  },
  {
    platform: "GitHub",
    name: "PackMD",
    username: "@thelastofinusa",
    url: "https://github.com/thelastofinusa/packmd",
  },
]

export const defaultMarkdown = () => {
  return `<p align="center">
  <strong>🎥 Watch the demo on YouTube (click the image)</strong>
</p>

<p align="center">
  <a target="_blank" href="https://www.youtube.com/watch?v=CULED3apEdI">
    <img
      src="https://packmd.vercel.app/og.png"
      alt="Watch the PackMD demo on YouTube"
    />
  </a>
</p>

## PackMD Monorepo

**Instant AI context.** PackMD converts GitHub repos, local directories, and live web pages into clean, token-efficient Markdown digests optimized for ChatGPT, Claude, and other LLMs.

### Features

- **One‑click generation** – Paste a URL or point to a local folder and get Markdown in seconds.
- **LLM‑optimized** – Strips noise, honors \`.gitignore\`, and formats content for maximum token efficiency.
- **Web App** – Interactive UI with live preview, history, and section-toggling capabilities.
- **CLI** – Run \`packmd\` directly from your terminal for seamless scripting and automation.
- **Shared Core** – A single source of truth for parsing, filtering, and Markdown generation across both environments.

### Web App – Key Pages

**Home (\`/\`)**

The main entry point. Paste a GitHub repo URL or a webpage link, adjust advanced options (max files, file size, glob patterns, GitHub token), and click **Generate**. The progress is streamed in real‑time.

![Home Page](https://packmd.vercel.app/assets/home.png)

**History (\`/history\`)**

Stores all generated digests locally in your browser’s IndexedDB with a 7‑day TTL. You can reopen any digest, remove individual entries, or clear the entire history.

![History Page](https://packmd.vercel.app/assets/history.png)

**Render (\`/render/[id]\`)**

View, edit, and customize the generated Markdown before copying or downloading. The page offers:

- **Split view** – raw Markdown editor on the left, live preview on the right (collapsible on mobile).
- **Section toggles** – show/hide title, source URL, images, and links.
- **Copy as \`.md\`** and **Download** buttons.

![Render Page](https://packmd.vercel.app/assets/render.png)

### CLI Tool

Install the CLI globally via npm:

\`\`\`bash
npm install -g packmd
\`\`\`

Or run it directly with npx:

\`\`\`bash
npx packmd <target> [options]
\`\`\`

**Examples:**

\`\`\`bash
# Generate digest from a GitHub repo
packmd [https://github.com/vercel/next.js](https://github.com/vercel/next.js) -o next.md

# Scrape a webpage (uses Jina Reader API)
packmd [https://react.dev](https://react.dev) --jina-api-key YOUR_KEY

# Digest the current directory
packmd .

# Use advanced options
packmd facebook/react --max-files 300 --exclude "*.test.js" --copy

\`\`\`

For all options, see the [CLI documentation](https://www.google.com/search?q=https://packmd.vercel.app/docs) or run \`packmd --help\`.

### Development Setup

**Prerequisites**

- **Node.js** ≥ 20
- **Bun** (or npm/pnpm) – the workspace uses Bun by default, but you can use any package manager.

**Install dependencies**

\`\`\`bash
bun install
# or npm install / pnpm install
\`\`\`

**Run the web app locally**

\`\`\`bash
bun run dev --filter=web
# or npm run dev --workspace=web
\`\`\`

Open \`http://localhost:3000\`.

**Run the CLI in development**

\`\`\`bash
bun run dev --filter=cli
# or npm run dev --workspace=cli
\`\`\`

**Build everything**

\`\`\`bash
bun run build
\`\`\`

### License

MIT © [Holiday](https://github.com/thelastofinusa)`
}
