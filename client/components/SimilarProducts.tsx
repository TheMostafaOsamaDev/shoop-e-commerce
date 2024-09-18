import { ApiError } from "@/lib/api-error";
import MessageAlert from "./MessageAlert";

export default async function SimilarProducts({
  category,
  subCategory,
}: {
  category?: string;
  subCategory?: string;
}) {
  let content;
  try {
    throw new Error("This is an error");
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

  return (
    <div>
      {category} - {subCategory}
    </div>
  );
}
