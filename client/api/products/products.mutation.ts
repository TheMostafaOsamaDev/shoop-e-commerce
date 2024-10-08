import { getAuthorizationToken } from "@/lib/actions/auth.actions";
import { baseApi } from "@/lib/baseApi";
import { AxiosResponse } from "axios";

export const toggleWishlistMutationFn = async ({
  productId,
}: {
  productId: string;
}) => {
  const token = await getAuthorizationToken();

  const promise: AxiosResponse<Product> = await baseApi.patch(
    `/products/${productId}/wishlist`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return promise;
};
