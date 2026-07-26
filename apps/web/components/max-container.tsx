import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@packmd/ui/lib/utils"

const maxContainerVariants = cva("mx-auto w-full px-5 md:px-6", {
  variants: {
    size: {
      screen: "",
      default: "max-w-lg md:max-w-xl lg:max-w-2xl",
      lg: "max-w-4xl md:max-w-5xl lg:max-w-6xl",
      md: "max-w-xl md:max-w-2xl lg:max-w-3xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function MaxContainer({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof maxContainerVariants> & { asChild?: boolean }) {
  return (
    <section
      data-slot="section"
      className={cn(maxContainerVariants({ size, className }))}
      {...props}
    />
  )
}

export { MaxContainer, maxContainerVariants }
