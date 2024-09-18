import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAssetsUrl, sliceText } from "@/lib/utils";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

export default function ProductGrid({
  products,
  isAdmin,
}: {
  products: Product[];
  isAdmin: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => {
        return (
          <Link key={`products_grid_${p.id}`} href={`/product/${p.id}`}>
            <Card className="relative shadow hover:shadow-sm transition-shadow overflow-hidden h-full hover:bg-secondary/55">
              <div>
                <FavoriteButton
                  className="absolute top-2 right-2"
                  productId={p.id}
                  disabled={isAdmin}
                />

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

                  <CardTitle className="text-lg">
                    {sliceText(p.title, 28)}
                  </CardTitle>
                </CardContent>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
