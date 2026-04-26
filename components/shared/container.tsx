import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-4 md:px-5", {
  variants: {
    size: {
      lg: "max-w-4xl",
      default: "max-w-3xl",
      md: "max-w-2xl",
      sm: "max-w-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Container({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & { asChild?: boolean }) {
  return (
    <section
      data-slot="section"
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
}

export { Container, containerVariants }
