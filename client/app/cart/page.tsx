"use client";
import {
  getCartItemsQueryFn,
  getCartItemsQueryKey,
} from "@/api/cart/cart.query";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

export default function CartPage() {
  const { data: session } = useSession();
  const { data, isPending, isError, error } = useQuery({
    queryKey: getCartItemsQueryKey(session?.user?.id),
    queryFn: ({ signal }) => getCartItemsQueryFn({ signal }),
    enabled: !session?.user?.id,
  });

  console.log({ data, isPending, error, isError });

  return (
    <div className="min-h-screen container">
      <div></div>
      <div></div>
    </div>
  );
}
