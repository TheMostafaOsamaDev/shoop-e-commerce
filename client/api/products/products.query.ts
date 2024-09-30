import { baseApi } from "@/lib/baseApi";
import { getQueryParams } from "@/lib/utils";
import axios from "axios";
import { sign } from "crypto";

export const getProducts = async ({
  signal,
  limit,
  offset,
  category,
  subCategory,
}: {
  signal: AbortSignal;
  limit?: number;
  offset?: number;
  category?: string;
  subCategory?: string;
}) => {
  // const queryParams = getQueryParams({ limit, offset, category, subCategory });

  // const CancelToken = axios.CancelToken;

  // const source = CancelToken.source();

  const promise = await baseApi.get(`/products`);

  // signal?.addEventListener("abort", () => {
  //   source.cancel();
  // });

  return promise;
};

export const getFeaturedProductsQuery = {
  queryKey: ["getFeaturedProducts"],
  queryFn: async ({
    signal,
    queryKey,
  }: {
    signal: AbortSignal;
    queryKey: any[];
  }) => {
    const [, { limit, offset, category, subCategory }] = queryKey;

    return getProducts({ signal, limit, offset, category, subCategory });
  },
};
