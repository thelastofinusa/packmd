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
