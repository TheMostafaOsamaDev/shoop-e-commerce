"use server";
import { redirect } from "next/navigation";
import { apolloClient } from "../apollo-client";
import { CREATE_MULTIPLE_PRODUCTS } from "../mutations/product.mutations";
import { checkAuthorizationAdmin } from "./auth.actions";

export const createMultipleProducts = async (products: any) => {
  const token = await checkAuthorizationAdmin();

  if (!token) {
    return redirect("/");
  }

  const res = await apolloClient.mutate({
    mutation: CREATE_MULTIPLE_PRODUCTS,
    variables: {
      createProductInputs: products,
    },
  });

  // const response = await apolloClient.mutate({
  //   mutation: CREATE_MULTIPLE_PRODUCTS,
  //   variables: {
  //     createProductInputs: products,
  //   },
  // });
};
