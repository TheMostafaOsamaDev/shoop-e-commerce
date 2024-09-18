import React from "react";
import { Button } from "./ui/button";
import { BadgeCheck, ShoppingBasket } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";
import { addToCart } from "@/lib/actions/product.actions";

const buttonClasses =
  "btn-icon-container justify-between h-[60px] px-6 rounded-full block w-full";

export default async function CartButton({
  productId,
  returnUrl,
  isInCart,
}: {
  productId: string;
  returnUrl: string;
  isInCart?: boolean;
}) {
  const session = await auth();
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

  if (isInCart) {
    return (
      <Button asChild className={buttonClasses} variant={"secondary"}>
        <Link href={"/cart"}>
          <BadgeCheck size={28} />
          <span className="flex-1 text-lg text-center">Added. Go to Cart</span>
        </Link>
      </Button>
    );
  }

  return (
    <form className="w-full" action={addToCart}>
      <input type="hidden" name="productId" defaultValue={productId} required />
      <input type="hidden" name="quantity" defaultValue={1} required />
      <Button disabled={isAdmin} className={buttonClasses}>
        {content}
      </Button>
    </form>
  );
}
