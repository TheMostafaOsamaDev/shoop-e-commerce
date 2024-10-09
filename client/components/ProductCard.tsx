import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import WishListButton from "./WishListButton";
import Link from "next/link";
import { getAssetsUrl, sliceText } from "@/lib/utils";
import Image from "next/image";

export default function ProductCard({
  p,
  isAdmin,
}: {
  p: any;
  isAdmin: boolean;
}) {
  return (
    <Card className="relative shadow hover:shadow-sm transition-shadow overflow-hidden h-full hover:bg-secondary/55">
      <div>
        <WishListButton
          className="absolute top-2 right-2"
          productId={p.id}
          disabled={isAdmin}
          isWishList={p.isInWishlist}
        />

        <Link href={`/product/${p.id}`}>
          <div className="p-5 grid place-content-center mb-14">
            <Image
              src={getAssetsUrl(
                p.images[0].url,
                p.images[0].isExternal,
                "products"
              )}
              className="h-[160px] w-fit object-contain"
              width={550}
              height={500}
              alt="product image"
            />
          </div>

          <CardContent className="h-full flex flex-col">
            <p className="mb-2 font-medium text-primary">$ {p.price}</p>

            <CardTitle className="text-lg hover:underline">
              {sliceText(p.title, 28)}
            </CardTitle>
          </CardContent>
        </Link>
      </div>
    </Card>
  );
}
