import React, { ReactNode } from "react";
import { headers } from "next/headers";
// import SectionHeader from "@/components/SectionHeader";
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

  let parsedUrl;
  if (fullUrl) parsedUrl = new URL(fullUrl || "");

  let pathname: string = "";
  if (parsedUrl) pathname = parsedUrl.pathname;

  const queryClient = new QueryClient();

  try {
    void queryClient.prefetchQuery({
      queryKey: getSingleProductQueryKey(productId), // ["getSingleProduct", { productId }]
      queryFn: async ({ signal }) =>
        getSingleProductQueryFn({ signal, productId }),
    });

    return (
      <div className="sub-container min-h-[calc(100vh-var(--header-height)-25px)]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SingleProduct />
        </HydrationBoundary>
      </div>
    );
  } catch (error) {
    return <MessageAlert title="" description="Error fetching product" />;
  }
}
