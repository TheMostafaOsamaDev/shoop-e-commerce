import { getSingleProduct } from "@/lib/actions/product.actions";
import { ApiError } from "@/lib/api-error";
import { getAssetsUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { headers } from "next/headers";
import CartButton from "@/components/CartButton";
import SimilarProducts from "@/components/SimilarProducts";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "@/components/SectionHeader";
import WishListButton from "@/components/WishListButton";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getSingleProductQueryFn,
  getSingleProductQueryKey,
} from "@/api/products/products.query";
import MessageAlert from "@/components/MessageAlert";
import SingleProduct from "@/components/SingleProduct";

export default async function SingleProductPage(props: {
  params: {
    productId: string;
  };
  searchParams: SearchParams;
}) {
  const { searchParams } = props;
  const { productId } = props.params;
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  let parsedUrl,
    pathname: string = "";
  if (fullUrl) parsedUrl = new URL(fullUrl || "");
  if (parsedUrl) pathname = parsedUrl.pathname;

  let product: Product | null = null;
  let content;

  const queryClient = new QueryClient();

  try {
    void queryClient.prefetchQuery({
      queryKey: getSingleProductQueryKey(productId),
      queryFn: async ({ signal }) =>
        getSingleProductQueryFn({ signal, productId }),
    });
  } catch (error) {
    content = <MessageAlert title="" description="Error fetching product" />;
  }

  // const imageParam = Number(searchParams?.image) || 1;
  // const productImages = product?.images || [];
  // const currentImage = productImages?.[imageParam - 1];
  // const url = currentImage?.url || "";
  // const isExternal = currentImage?.isExternal || false;
  // const route = isExternal ? "" : "products";

  return (
    <div className="sub-container min-h-[calc(100vh-var(--header-height)-25px)]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SingleProduct />
      </HydrationBoundary>
      {/* <div className="flex items-center gap-10">
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
            />

            <WishListButton
              productId={productId}
              buttonClassName="h-fit p-5"
              isWishList={product?.isInWishlist}
            />
          </div>
        </div>
      </div> */}

      <SectionHeader separatorClasses="my-8">
        <h2>Similar Products</h2>
        <p>You might also like these products based on your recent activity.</p>
      </SectionHeader>

      {/* <SimilarProducts
        category={product?.category}
        subCategory={product?.subCategory}
      /> */}
    </div>
  );
}
