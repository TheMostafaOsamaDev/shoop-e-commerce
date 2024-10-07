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
  const { productId } = props.params;
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  let parsedUrl,
    pathname: string = "";
  if (fullUrl) parsedUrl = new URL(fullUrl || "");
  if (parsedUrl) pathname = parsedUrl.pathname;

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

  return (
    <div className="sub-container min-h-[calc(100vh-var(--header-height)-25px)]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SingleProduct />
      </HydrationBoundary>

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
