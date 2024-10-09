import { getAuthorizationToken } from "@/lib/actions/auth.actions";
import { baseApi } from "@/lib/baseApi";
import axios from "axios";

export const getCartItemsQueryKey = (userId?: string) => ["cart", { userId }];

export const getCartItemsQueryFn = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const token = await getAuthorizationToken();

  const promise = await baseApi.get(`/cart`, {
    headers: {
      authorization: token,
    },
  });

  signal?.addEventListener("abort", () => {
    source.cancel();
  });

  return promise;
};
