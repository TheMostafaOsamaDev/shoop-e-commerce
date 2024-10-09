"use client";
import React from "react";
import { Button } from "./ui/button";
import { BadgeCheck, ShoppingBasket } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { QueryCache, useMutation } from "@tanstack/react-query";
import { addToCartMutationFn } from "@/api/products/products.mutation";
import { useRouter } from "next/navigation";
import { handleUnauthorizedError } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { ApiError } from "@/lib/api-error";
import { getQueryClient } from "./providers/QueryClientProvider";
import { getSingleProductQueryKey } from "@/api/products/products.query";
import DotsLoader from "./DotsLoader";
import clsx from "clsx";
import { Session } from "next-auth";

const buttonClasses =
  "btn-icon-container justify-between h-[60px] px-6 rounded-full block w-full";

export default function CartButton({
  productId,
  returnUrl,
  isInCart,
  session,
}: {
  productId: string;
  returnUrl: string;
  isInCart?: boolean;
  session: Session | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = getQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: async () => addToCartMutationFn({ productId, quantity: 1 }),
    onError: (error) => {
      const formattedError = ApiError.generate(error);

      if (formattedError.status === 401) {
        return handleUnauthorizedError(error, router);
      } else {
        toast({
          description: formattedError.title || formattedError.description,
          variant: "destructive",
        });
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: getSingleProductQueryKey(productId),
      });
    },
  });

  const isAdmin = session?.user?.role === "admin";
  const content = (
    <>
      <ShoppingBasket size={28} />
      <span className="flex-1 text-lg text-center">Add to Cart</span>
    </>
  );
  if (!session?.user) {
    const returnUrlQuery = returnUrl ? `?returnUrl=${returnUrl}` : "";
    return (
      <Button asChild className={buttonClasses}>
        <Link href={"/auth/log-in" + returnUrlQuery}>{content}</Link>
      </Button>
    );
  }

  if (addToCartMutation.isPending) {
    return (
      <Button asChild className={buttonClasses} variant={"outline"}>
        <div>
          <DotsLoader />
          <span className="flex-1 text-lg text-center">Adding to cart...</span>
        </div>
      </Button>
    );
  }

  if (isInCart) {
    return (
      <Button
        asChild
        className={clsx(buttonClasses, "hover:border-primary")}
        variant={"outline"}
      >
        <Link href={"/cart"}>
          <BadgeCheck size={28} className="text-primary" />
          <span className="flex-1 text-lg text-center">Added. Go to Cart</span>
        </Link>
      </Button>
    );
  }

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addToCartMutation.mutate();
  };

  return (
    <form className="w-full" onSubmit={handleAddToCart}>
      <input type="hidden" name="productId" defaultValue={productId} required />
      <input type="hidden" name="quantity" defaultValue={1} required />
      <Button disabled={isAdmin} className={buttonClasses}>
        {content}
      </Button>
    </form>
  );
}
