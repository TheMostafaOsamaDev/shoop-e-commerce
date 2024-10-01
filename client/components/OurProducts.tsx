import React from "react";
import SectionHeader from "./SectionHeader";
import { ApiError } from "@/lib/api-error";
import ProductGrid from "./ProductGrid";
import MessageAlert from "./MessageAlert";
import { auth } from "@/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getFeaturedProductsQuery } from "@/api/products/products.query";

export default async function OurProducts() {
  // Get the user session
  const session = await auth();
  let isAdmin = false;

  if (session?.user) {
    isAdmin = session?.user?.role === "admin";
  }

  const queryClient = new QueryClient();

  void queryClient.prefetchQuery(getFeaturedProductsQuery);

  // Get the featured products
  let content;

  try {
    const data: Product[] = [];

    if (data?.length === 0)
      content = <MessageAlert title="" description="No product where found" />;

    content = (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductGrid products={data} isAdmin={isAdmin} />
      </HydrationBoundary>
    );
  } catch (error) {
    // Log the error
    ApiError.log(error);

    content = (
      <MessageAlert
        title="Sorry"
        description="Failed to fetch products"
        variant="destructive"
      />
    );
  }

  return (
    <div>
      <SectionHeader>
        <h3>Our Products</h3>
        <p>See our latest products and find the perfect one for you.</p>
      </SectionHeader>

      {content}
    </div>
  );
}
