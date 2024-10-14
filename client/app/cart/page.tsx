"use client";
import {
  getCartItemsQueryFn,
  getCartItemsQueryKey,
} from "@/api/cart/cart.query";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import CartItemsTable from "@/components/CartItemsTable";
import CartItemsTableSkeleton from "@/components/skeletons/CartItemsTableSkeleton";
import CheckOutPanel from "@/components/CheckOutPanel";
import MessageAlert from "@/components/MessageAlert";
import CheckOutPanelSkeleton from "@/components/skeletons/CheckOutPanelSkeleton";

export default function CartPage() {
  const { data: session } = useSession();
  const {
    data,
    isPending: pendingCartItems,
    isSuccess: successCartItems,
    isError: errorCartItems,
  } = useQuery({
    queryKey: getCartItemsQueryKey(session?.user?.id),
    queryFn: ({ signal }) => getCartItemsQueryFn({ signal }),
    enabled: !session?.user?.id,
  });

  const isSuccessAndEmpty = successCartItems && !data?.data;

  return (
    <div
      className={`min-h-screen container flex flex-col lg:grid justify-between gap-5 ${
        isSuccessAndEmpty || errorCartItems
          ? "grid-cols-1"
          : "lg:grid-cols-[1fr_340px]"
      }`}
    >
      <div className="pt-4">
        {pendingCartItems && <CartItemsTableSkeleton skeletonSize={5} />}
        {data?.data && <CartItemsTable cartItems={data.data} />}
        {isSuccessAndEmpty && (
          <MessageAlert
            title="No products found"
            description="your cart is empty. Add some products to continue shopping."
          />
        )}
      </div>
      <div
        className={`${
          isSuccessAndEmpty || errorCartItems ? "hidden" : "block"
        }`}
      >
        {pendingCartItems && <CheckOutPanelSkeleton />}
        {isSuccessAndEmpty && <CheckOutPanel cartItems={data.data} />}

        {data?.data && <CheckOutPanel cartItems={data.data} />}
      </div>
    </div>
  );
}
