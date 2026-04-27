import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-lg bg-muted squircle sm:rounded-xl md:rounded-2xl lg:rounded-3xl",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
