import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { addToFavorites } from "@/lib/actions/favorite.actions";

export default function FavoriteButton({
  productId,
  className,
  disabled,
}: {
  productId: number;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <form className={clsx(className)} action={addToFavorites}>
      <input type="hidden" defaultValue={productId} required name="productId" />

      <Button
        className={"h-fit p-3 rounded-full"}
        variant={"secondary"}
        disabled={disabled}
      >
        <Heart />
      </Button>
    </form>
  );
}
