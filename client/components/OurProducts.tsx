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
  let content;
  const queryClient = new QueryClient();

  try {
    void queryClient.prefetchQuery(getFeaturedProductsQuery);
  } catch (error) {
    content = (
      <MessageAlert
        description={ApiError.generate(error).description || ""}
        title="Error ocurred"
      />
    );
  }

  try {
    content = (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductGrid />
      </HydrationBoundary>
    );
  } catch (error) {
    console.log(error);
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
