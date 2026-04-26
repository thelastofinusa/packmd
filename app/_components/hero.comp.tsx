import { Container } from "@/components/shared/container"
import { siteConfig } from "@/config/site.config"
import { GitBranch } from "lucide-react"

export const HeroComp = () => {
  return (
    <Container size="sm" className="py-20 text-center">
      <div className="mx-auto mb-4 inline-flex w-max items-center gap-2 rounded-full border bg-card px-2.5 py-0.5">
        <GitBranch className="size-4" />
        <span className="text-[13px] font-medium">{siteConfig.name}</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {siteConfig.title}
      </h1>
      <p className="mt-6 text-base text-muted-foreground md:text-lg">
        {siteConfig.description}
      </p>
    </Container>
  )
}
