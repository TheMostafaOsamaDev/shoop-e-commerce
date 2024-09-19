import { ApiError } from "@/lib/api-error";
import MessageAlert from "./MessageAlert";
import { getFeaturedProducts } from "@/lib/actions/product.actions";
import ProductGrid from "./ProductGrid";
import { auth } from "@/auth";

export default async function SimilarProducts({
  category,
  subCategory,
}: {
  category?: string;
  subCategory?: string;
}) {
  let content;
  try {
    const session = await auth();

    const res = await getFeaturedProducts({
      category: "",
      subCategory: "",
      limit: 4,
      offset: 0,
    });

    if (res?.data?.getFeaturedProducts) {
      const products = res.data.getFeaturedProducts as Product[];

      content = (
        <ProductGrid
          products={products}
          isAdmin={session?.user?.role === "admin"}
        />
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
