import { Container } from "@/components/shared/container"
import { siteConfig } from "@/config/site.config"

export const HeroComp = () => {
  return (
    <Container size="sm" className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {siteConfig.title}
      </h1>
      <p className="mt-6 text-base text-muted-foreground md:text-lg">
        {siteConfig.description}
      </p>
    </Container>
  )
}
