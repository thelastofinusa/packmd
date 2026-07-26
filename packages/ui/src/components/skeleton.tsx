import { cn } from "@packmd/ui/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-secondary dark:bg-card",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
