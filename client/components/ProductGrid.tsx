"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAssetsUrl, sliceText } from "@/lib/utils";
import Image from "next/image";
import WishListButton from "./WishListButton";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedProductsQuery } from "@/api/products/products.query";
import ProductCard from "./ProductCard";

export default function ProductGrid(props: { isAdmin: boolean }) {
  const {
    data: { data: products },
  } = useSuspenseQuery(getFeaturedProductsQuery);

  const { isAdmin } = props;

  return (
    <div className="products-grid">
      {products.map((p) => {
        return (
          <div key={`products_grid_${p.id}`}>
            <ProductCard p={p} isAdmin={isAdmin} />
          </div>
        );
      })}
    </div>
  );
}
