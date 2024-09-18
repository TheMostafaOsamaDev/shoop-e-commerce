import { getSingleProduct } from "@/lib/actions/product.actions";
import { ApiError } from "@/lib/api-error";
import { getAssetsUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { headers } from "next/headers";
import { Separator } from "@/components/ui/separator";
import CartButton from "@/components/CartButton";
import SimilarProducts from "@/components/SimilarProducts";

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

  try {
    const data = await getSingleProduct(productId);
    product = data?.data?.getSingleProduct;

    if (!product) {
      throw ApiError.makeError("Product not found", 404);
    }
  } catch (error) {
    const err = ApiError.generate(error);

    if (err.status === 404) {
      return notFound();
    }
  }

  const imageParam = Number(searchParams?.image) || 1;
  const productImages = product?.images || [];
  const currentImage = productImages?.[imageParam - 1];
  const url = currentImage?.url || "";
  const isExternal = currentImage?.isExternal || false;
  const route = isExternal ? "" : "products";

  return (
    <div className="sub-container min-h-[calc(100vh-var(--header-height)-25px)]">
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

          <CartButton
            productId={productId}
            returnUrl={pathname}
            isInCart={product?.isInCart}
          />
        </div>
      </div>

      <SimilarProducts
        category={product?.category}
        subCategory={product?.subCategory}
      />
    </div>
  );
}
