import React from "react";
import { Button } from "./ui/button";
import { ShoppingBasket } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

const buttonClasses =
  "btn-icon-container justify-between h-[60px] px-6 rounded-full block w-full";

export default async function CartButton({
  productId,
  returnUrl,
}: {
  productId: string;
  returnUrl: string;
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

  return (
    <form className="w-full">
      <Button disabled={isAdmin} className={buttonClasses}>
        {content}
      </Button>
    </form>
  );
}
