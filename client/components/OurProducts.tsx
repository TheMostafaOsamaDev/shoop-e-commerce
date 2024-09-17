import React from "react";
import SectionHeader from "./SectionHeader";
// import { getProducts } from "@/lib/actions/product.actions";
import { ApiError } from "@/lib/api-error";
import ProductGrid from "./ProductGrid";

export default async function OurProducts() {
  let content;

  try {
    // const res: { getHomeProducts: Product[] } = await getProducts({});
    // content = <ProductGrid products={res.getHomeProducts} />;
  } catch (error) {
    // Log the error
    ApiError.log(error);

    content = <p>There was an error loading the products</p>;
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
