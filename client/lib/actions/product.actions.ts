"use server";
import { redirect } from "next/navigation";
import { apolloClient } from "../apollo-client";
import {
  CREATE_MULTIPLE_PRODUCTS,
  ADD_TO_CART,
} from "../mutations/product.mutations";
import { checkAuthorizationAdmin, getAuthorizationToken } from "./auth.actions";
import {
  GET_FEATURED_PRODUCTS,
  GET_SINGLE_PRODUCT,
} from "../queries/product.query";

export const createMultipleProducts = async (products: any) => {
  const token = await checkAuthorizationAdmin();

  if (!token) {
    return redirect("/");
  }

  return await apolloClient.mutate({
    mutation: CREATE_MULTIPLE_PRODUCTS,
    variables: {
      createProductInputs: products,
    },
  });
};

export const getFeaturedProducts = async (variables: GetProductsVariables) => {
  // with caching
  return await apolloClient.query({
    query: GET_FEATURED_PRODUCTS,
    variables: {
      getHomeProductsInput: variables,
    },
  });
};

export const getSingleProduct = async (id: string) => {
  const token = await getAuthorizationToken();

  return await apolloClient.query<{ getSingleProduct: Product }>({
    query: GET_SINGLE_PRODUCT,
    variables: {
      getSingleProductId: id,
    },
    context: {
      headers: {
        authorization: token ? `${token}` : "",
      },
    },
  });
};

export const addToCart = async (formData: FormData) => {
  const productId = formData.get("productId");
  const quantity = Number(formData.get("quantity") || 1);

  const token = await getAuthorizationToken();

  return await apolloClient.mutate({
    mutation: ADD_TO_CART,
    variables: {
      productId,
      quantity,
    },
    context: {
      headers: {
        authorization: token ? `${token}` : "",
      },
    },
    update: (cache, { data }) => {
      if (!data?.addToCart) return;

      const existingProduct = cache.readQuery<{ getSingleProduct: Product }>({
        query: GET_SINGLE_PRODUCT,
        variables: {
          getSingleProductId: productId,
        },
      });

      if (existingProduct?.getSingleProduct) {
        let newProduct = {
          ...existingProduct.getSingleProduct,
          isInCart: true,
        };

        console.log(newProduct);

        cache.writeQuery({
          query: GET_SINGLE_PRODUCT,
          variables: {
            getSingleProductId: productId,
          },
          data: {
            getSingleProduct: newProduct,
          },
        });
      }
    },
  });
};
