"use server";
import { redirect } from "next/navigation";
import { apolloClient } from "../apollo-client";
import { CREATE_MULTIPLE_PRODUCTS } from "../mutations/product.mutations";
import { checkAuthorizationAdmin } from "./auth.actions";
import { GET_FEATURED_PRODUCTS } from "../queries/product.query";

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
