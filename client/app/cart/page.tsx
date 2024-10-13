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
  const { data } = useQuery({
    queryKey: getCartItemsQueryKey(session?.user?.id),
    queryFn: ({ signal }) => getCartItemsQueryFn({ signal }),
    enabled: !session?.user?.id,
  });

  return (
    <div className="min-h-screen container grid justify-between gap-5 grid-cols-[1fr_340px]">
      <div>
        <CartItemsTable cartItems={data?.data || []} />
      </div>
      <div>
        <CheckOutPanel cartItems={data?.data || []} />
      </div>
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
          <TableHead>Delete</TableHead>
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
                $ {p.price}
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
const CheckOutPanel = ({ cartItems }: { cartItems: Cart[] }) => {
  let totalPrice: number = 0;

  if (cartItems.length) {
    totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  }

  return (
    <div className="sticky top-0 pt-4 flex flex-col gap-6">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Apply Coupon</CardTitle>
          <CardDescription className="text-xs font-medium">
            Use coupons to get discounts on your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 p-4">
          <Input type="text" placeholder="code" />

          <Button>Apply</Button>
        </CardContent>
      </Card>

      <Card className="p-4 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">Total</CardTitle>
        </CardHeader>

        <Separator className="w-full h-[0.8px]" />
        {/* TODO: Add discount */}
        <CardContent className="p-0 space-y-3">
          <div className="font-medium flex items-center justify-between">
            <span>Total</span>

            <span>$ {totalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery</span>

            <span>$ 14.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>

            <span>-${0}</span>
          </div>
        </CardContent>

        <Separator className="w-full h-[0.8px]" />

        <CardFooter className="p-0 flex flex-col space-y-3">
          <div className="font-medium flex items-center w-full justify-between">
            <span>Total</span>

            <span>${totalPrice + 14}</span>
          </div>

          <Button className="w-full">Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
