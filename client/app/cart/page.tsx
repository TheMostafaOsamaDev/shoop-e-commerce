"use client";
import {
  getCartItemsQueryFn,
  getCartItemsQueryKey,
} from "@/api/cart/cart.query";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const { data: session } = useSession();
  const { data, isPending, isError, error } = useQuery({
    queryKey: getCartItemsQueryKey(session?.user?.id),
    queryFn: ({ signal }) => getCartItemsQueryFn({ signal }),
    enabled: !session?.user?.id,
  });

  // /* if(isPending) */ if(true) {

  // }

  console.log(data);

  return (
    <div className="min-h-screen container grid grid-cols-[1fr_auto]">
      <div>
        <CartItemsTable cartItems={data?.data || []} />
      </div>
      <div></div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cart } from "@/types/cart";
import Image from "next/image";
import { getAssetsUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CartItemsTable = ({ cartItems }: { cartItems: Cart[] }) => {
  return (
    <Table>
      <TableCaption>A list of your cart items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Preview</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((item) => {
          const p = item.product;

          return (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={getAssetsUrl(
                    p.images[0].url,
                    p.images[0].isExternal,
                    "products"
                  )}
                  className="size-[60px] w-fit object-contain"
                  width={550}
                  height={500}
                  alt="product image"
                />
              </TableCell>
              <TableCell className="font-medium">{p.title}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Button
                    className="p-2 px-3 h-fit"
                    variant={"secondary"}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  <span className="w-[30px] text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    className="p-2 px-3 h-fit"
                    variant={"secondary"}
                    disabled={item.quantity === p.quantity}
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-nowrap font-medium">
                {p.price} $
              </TableCell>
            </TableRow>
          );
        })}
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
};
