export const siteConfig = {
  name: "PackMD",
  slogan: "Instant AI context.",
  description:
    "PackMD converts GitHub repos, local directories, and live web pages into clean, token-efficient Markdown digests optimized for ChatGPT, Claude, and other LLMs.",
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
    "Local Directory to Markdown",
    "LLM Context Generator",
    "Codebase Ingestion",
    "Claude Prompting",
    "ChatGPT Context Window",
    "Developer Tools",
  ],
} as const

export type SiteConfig = typeof siteConfig
