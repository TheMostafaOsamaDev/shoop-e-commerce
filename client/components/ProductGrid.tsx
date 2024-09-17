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

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => {
        console.log(p);

        return (
          <Card
            key={`products_grid_${p.id}`}
            className="relative shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <FavoriteButton className="absolute top-2 right-2" />

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
          </Card>
        );
      })}
    </div>
  );
}
