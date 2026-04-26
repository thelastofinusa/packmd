import { siteConfig } from "@/config/site.config"
import { GitBranch } from "lucide-react"

export default function Page() {
  return (
    <div className="relative min-h-dvh">
      <span className="flex items-center gap-2">
        <GitBranch className="size-4" />
        {siteConfig.name}
      </span>
      <h1>{siteConfig.title}</h1>
      <p>{siteConfig.description}</p>
    </div>
  )
}
