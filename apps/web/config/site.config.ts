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
