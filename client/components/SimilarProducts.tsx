"use client";
import { ApiError } from "@/lib/api-error";
import MessageAlert from "./MessageAlert";
import ProductGrid from "./ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProducts } from "@/api/products/products.query";
import { useSession } from "next-auth/react";
import ProductCard from "./ProductCard";

export default function SimilarProducts({
  category,
  subCategory,
}: {
  category?: string;
  subCategory?: string;
}) {
  const params = useParams();
  const { data: session } = useSession();
  const { data: productsData } = useQuery({
    queryKey: ["getSimilarProducts", { productId: params.productId }],
    queryFn: ({ signal }) =>
      getProducts({
        signal,
        limit: 5,
        category,
        // subCategory,
      }),
  });
  const isAdmin = session?.user?.role === "admin";
  console.log("~~~~~~~~~~~~ SimilarProducts ~~~~~~~~~~~~");
  console.log(productsData);

  let content;
  try {
    if (productsData) {
      const products = productsData.data;
      content = (
        <div className="products-grid">
          {products
            .filter((p) => p.id.toString() !== params.productId)
            .map((p) => {
              return (
                <div key={`products_grid_${p.id}`}>
                  <ProductCard p={p} isAdmin={isAdmin} />
                </div>
              );
            })}
        </div>
      );
    } else {
      content = (
        <MessageAlert
          variant="default"
          title=""
          description="No similar products found"
        />
      );
    }
  } catch (error) {
    const { title } = ApiError.generate(error);

    content = (
      <MessageAlert
        variant="destructive"
        title="Can't get similar products"
        description={`An error occurred while trying to get similar products: ${title}`}
      />
    );
  }

  return <div>{content}</div>;
}

const SimilarProductsSkeleton = () => {
  return <div className="products-grid"></div>;
};
