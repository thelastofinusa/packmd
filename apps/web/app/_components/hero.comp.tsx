import { Container } from "@/components/shared/container"
import { siteConfig } from "@/config/site.config"
import { InstallCmd } from "@/components/shared/install-cmd"

export const HeroComp = () => {
  return (
    <Container size="sm" className="py-16 text-center md:pt-20 lg:pt-26">
      <InstallCmd />

      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {siteConfig.title}
      </h1>
      <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground">
        {siteConfig.description}
      </p>
    </Container>
  )
}
