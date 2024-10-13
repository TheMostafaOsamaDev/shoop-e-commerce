"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedProductsQuery } from "@/api/products/products.query";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";

export default function ProductGrid() {
  const { data } = useSuspenseQuery(getFeaturedProductsQuery);
  const { data: session } = useSession();

  return (
    <div className="products-grid">
      {data?.data.map((p) => {
        return (
          <div key={`products_grid_${p.id}`}>
            <ProductCard p={p} isAdmin={session?.user?.role === "admin"} />
          </div>
        );
      })}
    </div>
  );
}
