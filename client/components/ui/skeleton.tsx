import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-main bg-muted h-5", className)}
      {...props}
    />
  );
}

export { Skeleton };
