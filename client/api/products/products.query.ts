import { getAuthorizationToken } from "@/lib/actions/auth.actions";
import { baseApi } from "@/lib/baseApi";
import axios, { AxiosResponse } from "axios";

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
  let queries: {
    limit: number;
    offset: number;
    category?: string;
    subCategory?: string;
  } = {
    limit: limit || 12,
    offset: offset || 0,
  };

  if (category) {
    queries = {
      ...queries,
      category,
    };
  }

  if (subCategory) {
    queries = {
      ...queries,
      subCategory,
    };
  }

  const token = await getAuthorizationToken();

  const promise: AxiosResponse<Product[]> = await baseApi.get(`/products`, {
    params: queries,
    headers: {
      authorization: token,
    },
  });

  signal?.addEventListener("abort", () => {
    source.cancel();
  });

  return promise;
};

export const getFeaturedProductsQuery = {
  queryKey: ["getFeaturedProducts"],
  queryFn: async ({
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

  const token = await getAuthorizationToken();

  const promise: AxiosResponse<Product> = await baseApi.get(
    `/products/${productId}`,
    {
      headers: {
        Authorization: token,
      },
    }
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
