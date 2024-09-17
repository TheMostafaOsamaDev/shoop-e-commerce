import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";

export default function FavoriteButton({ className }: { className?: string }) {
  return (
    <Button
      className={clsx("h-fit p-3 rounded-full", className)}
      variant={"secondary"}
    >
      <Heart />
    </Button>
  );
}
