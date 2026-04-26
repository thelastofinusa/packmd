import { Container } from "@/components/shared/container"
import { siteConfig } from "@/config/site.config"
import { Icons } from "hugeicons-proxy"

export const HeroComp = () => {
  return (
    <Container size="sm" className="py-20 text-center">
      <div className="group relative mx-auto mb-6 inline-flex -rotate-3 cursor-default items-center gap-2 rounded-full border border-primary bg-linear-to-r from-primary/40 via-primary/20 to-primary/10 px-3.5 py-1 text-teal-300 shadow-2xl shadow-primary/20 transition-all duration-500 hover:shadow-primary/80">
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <Icons.GitBranchIcon className="relative z-10 size-3.5 transition-transform duration-500 group-hover:rotate-12" />
        <span className="relative z-10 text-[13px] font-bold">
          {siteConfig.name}
        </span>
        <span>-</span>
        <span className="relative z-10 text-[13px] font-medium">
          {siteConfig.slogan}
        </span>
      </div>

      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {siteConfig.title}
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground">
        {siteConfig.description}
      </p>
    </Container>
  )
}
