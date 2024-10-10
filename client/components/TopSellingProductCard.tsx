import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

export default function TopSellingProductCard({ height }: { height?: string }) {
  return (
    <div className={clsx("w-full h-full rounded-main", height)}>
      <Skeleton className="w-full h-full rounded-main" />
    </div>
  );
}
