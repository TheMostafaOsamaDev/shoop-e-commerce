"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAssetsUrl, sliceText } from "@/lib/utils";
import Image from "next/image";
import WishListButton from "./WishListButton";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/actions/product.actions";
import { getFeaturedProductsQuery } from "@/api/products/products.query";

export default function ProductGrid(props: {
  products: Product[];
  isAdmin: boolean;
}) {
  const {
    data: { data: products },
  } = useSuspenseQuery(getFeaturedProductsQuery);
  console.log(products);

  const { isAdmin } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => {
        return (
          <div key={`products_grid_${p.id}`}>
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
          </div>
        );
      })}
    </div>
  );
}
