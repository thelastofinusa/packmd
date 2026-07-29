import React from "react"
import { defaultMarkdown } from "@/lib/constants"
import { ThemeProvider } from "./theme.provider"
import { RenderProvider } from "./render.provider"
import ClickSpark from "@packmd/ui/components/click-spark"
import { TooltipProvider } from "@packmd/ui/components/tooltip"
import { Toaster } from "@packmd/ui/components/sonner"

export const GlobalProvider: React.FC<React.PropsWithChildren> = (props) => {
  const markdown = defaultMarkdown()

  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="var(--foreground)"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <RenderProvider initialMarkdown={markdown}>
          <TooltipProvider delay={0}>
            <Toaster richColors position="top-center" />
            {props.children}
          </TooltipProvider>
        </RenderProvider>
      </ClickSpark>
    </ThemeProvider>
  )
}
