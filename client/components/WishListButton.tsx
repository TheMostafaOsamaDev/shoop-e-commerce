"use client";
import React from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { toggleWishlistMutationFn } from "@/api/products/products.mutation";
import { getQueryClient } from "./providers/QueryClientProvider";
import { getSingleProductQueryKey } from "@/api/products/products.query";

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
  const queryClient = getQueryClient();
  const toggleWishListMutation = useMutation({
    mutationFn: () =>
      toggleWishlistMutationFn({ productId: productId.toString() }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getSingleProductQueryKey(productId.toString()),
      });
    },
    // onMutate: () => {

    //   // Editing cache not working currently
    //   const previousData = queryClient.getQueriesData({
    //     queryKey: getSingleProductQueryKey(productId.toString()),
    //   });

    //   // @ts-ignore
    //   if (previousData?.[0]?.[1]?.data) {
    //     // @ts-ignore
    //     previousData[0][1].data.isWishList = !isWishList;

    //     queryClient.setQueryData(
    //       getSingleProductQueryKey(productId.toString()),
    //       previousData
    //     );

    //     return { previousData };
    //   }
    // },
  });

  const handleToggleWishList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toggleWishListMutation.mutate();
  };

  return (
    <form className={clsx(className)} onSubmit={handleToggleWishList}>
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
        disabled={disabled || toggleWishListMutation.isPending}
      >
        <Heart
          className={`${isWishList ? "fill-red-500 stroke-red-500" : ""}`}
        />
      </Button>
    </form>
  );
}
