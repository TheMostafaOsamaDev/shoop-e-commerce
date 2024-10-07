"use client";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";

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
  const handleToggleWishList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic here
  };

  return (
    <form className={clsx(className)}>
      <input type="hidden" defaultValue={productId} required name="productId" />

      <Button
        className={clsx(
          "h-fit p-3 rounded-full transition-colors",
          `${
            isWishList
              ? "bg-red-200/40 hover:bg-red-200/50 dark:bg-red-900/40 dark:hover:dark:bg-red-900/50"
              : ""
          }`,
          buttonClassName
        )}
        variant={"secondary"}
        disabled={disabled}
      >
        <Heart
          className={`${isWishList ? "fill-red-500 stroke-red-500" : ""}`}
        />
      </Button>
    </form>
  );
}
