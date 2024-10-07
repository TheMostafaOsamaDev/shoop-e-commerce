import { getAuthorizationToken } from "@/lib/actions/auth.actions";
import { baseApi } from "@/lib/baseApi";
import { AxiosResponse } from "axios";

export const addToCartMutationFn = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const token = await getAuthorizationToken();
  const quantityValue = quantity || 1;

  const promise: AxiosResponse<Product> = await baseApi.patch(
    `/products/${productId}/cart?quantity=${quantityValue}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return promise;
};
