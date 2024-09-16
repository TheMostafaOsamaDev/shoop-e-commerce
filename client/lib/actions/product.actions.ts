import { apolloClient } from "../apollo-client";
import { CREATE_MULTIPLE_PRODUCTS } from "../mutations/product.mutations";
import { checkAuthorizationAdmin } from "./auth.actions";

export const createMultipleProducts = async (products: any) => {
  const isAllowed = await checkAuthorizationAdmin();
  console.log("isAllowed", isAllowed);
  // const response = await apolloClient.mutate({
  //   mutation: CREATE_MULTIPLE_PRODUCTS,
  //   variables: {
  //     createProductInputs: products,
  //   },
  // });
};
