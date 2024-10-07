import { baseApi } from "@/lib/baseApi";
import { getQueryParams } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
import { sign } from "crypto";

// All products
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
  const CancelToken = axios.CancelToken;

  const source = CancelToken.source();

  const promise: AxiosResponse<Product[]> = await baseApi.get(`/products`, {});

  signal?.addEventListener("abort", () => {
    source.cancel();
  });

  return promise;
};

export const getFeaturedProductsQuery = {
  queryKey: ["getFeaturedProducts"],
  queryFn: async ({
    signal,
    queryKey,
  }: {
    signal: AbortSignal;
    queryKey: any;
  }) => {
    return getProducts({ signal, limit: 12 });
  },
};

// Single product
export const getSingleProduct = async ({
  signal,
  productId,
}: {
  signal: AbortSignal;
  productId: string;
}) => {
  const CancelToken = axios.CancelToken;

  const source = CancelToken.source();

  const promise: AxiosResponse<Product> = await baseApi.get(
    `/products/${productId}`,
    {}
  );

  signal?.addEventListener("abort", () => {
    source.cancel;
  });

  return promise;
};

export const getSingleProductQueryKey = (productId: string) => [
  "getSingleProduct",
  { productId },
];

export const getSingleProductQueryFn = async ({
  signal,
  productId,
}: {
  signal: AbortSignal;
  productId: string;
}) => {
  return getSingleProduct({ signal, productId });
};
