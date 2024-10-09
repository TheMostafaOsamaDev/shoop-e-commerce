"use client";
import {
  getSingleProductQueryFn,
  getSingleProductQueryKey,
} from "@/api/products/products.query";
import { getAssetsUrl } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import CartButton from "./CartButton";
import WishListButton from "./WishListButton";
import SectionHeader from "./SectionHeader";
import SimilarProducts from "./SimilarProducts";
import { useSession } from "next-auth/react";

export default function SingleProduct() {
  const params = useParams();
  const pathname = usePathname();
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;
  // Here When Update the cahce
  const { data, isLoading, isFetching, isPending } = useSuspenseQuery({
    queryKey: getSingleProductQueryKey(productId),
    queryFn: async ({ signal }) =>
      getSingleProductQueryFn({ signal, productId }),
  });
  const { data: session } = useSession();

  const product = data?.data;

  const imageParam = Number(params.image) || 1;
  const productImages = product.images || [];
  const currentImage = productImages[imageParam - 1];
  const url = currentImage.url || "";
  const isExternal = currentImage.isExternal || false;
  const route = isExternal ? "" : "products";

  return (
    <>
      <div className="flex items-center gap-10">
        <div className="space-y-3">
          <div className="w-[630px] h-[400px] overflow-hidden">
            <Image
              src={getAssetsUrl(url, isExternal, route)}
              width={1920}
              height={1080}
              alt="product"
              className="w-full h-full object-contain rounded-md"
            />
          </div>

          <div className="flex items-center justify-center gap-2 mx-auto">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`p-[4px] rounded-md overflow-hidden shadow-sm transition-colors  cursor-pointer ${
                  imageParam === index + 1
                    ? "border-primary/100 border-2"
                    : "border border-foreground/40 hover:border-primary"
                }`}
              >
                <Link href={`${pathname}?image=${index + 1}`}>
                  <Image
                    src={getAssetsUrl(image.url, image.isExternal, "products")}
                    width={50}
                    height={50}
                    alt="product"
                    className="size-[58px] hover:scale-[1.01] transition-transform"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 h-full flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">{product?.title}</h1>
          <p className="text-xl font-medium bg-primary px-5 py-2 rounded-full text-background w-fit">
            ${product?.price}
          </p>

          <Separator className="w-full" />

          <p className="text-sm font-medium">
            Available items: {product?.quantity}
          </p>

          <div className="flex items-center gap-4">
            <CartButton
              productId={productId}
              returnUrl={pathname}
              isInCart={product?.isInCart}
              session={session}
            />

            <WishListButton
              productId={productId}
              buttonClassName="h-fit p-5"
              isWishList={product?.isInWishlist}
              disabled={!session?.user}
            />
          </div>
        </div>
      </div>

      <SectionHeader separatorClasses="my-8">
        <h2>Similar Products</h2>
        <p>You might also like these products based on your recent activity.</p>
      </SectionHeader>

      <SimilarProducts
        category={data?.data?.category}
        subCategory={data?.data?.subCategory}
      />
    </>
  );
}
