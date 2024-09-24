import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { toggleWishList } from "@/lib/actions/product.actions";

export default function WishListButton({
  productId,
  className,
  disabled,
  isWishList,
  buttonClassName,
}: {
  productId: number | string;
  isWishList?: boolean;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <form className={clsx(className)} action={toggleWishList}>
      <input type="hidden" defaultValue={productId} required name="productId" />

      <Button
        className={clsx("h-fit p-3 rounded-full", buttonClassName)}
        variant={"secondary"}
        disabled={disabled}
      >
        <Heart className={`${isWishList ? "fill-red-500" : ""}`} />
      </Button>
    </form>
  );
}
