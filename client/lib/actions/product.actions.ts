"use server";
import { redirect } from "next/navigation";
import { getClient } from "../apollo-client";
import {
  CREATE_MULTIPLE_PRODUCTS,
  ADD_TO_CART,
  TOGGLE_WISHLIST,
} from "../mutations/product.mutations";
import { checkAuthorizationAdmin, getAuthorizationToken } from "./auth.actions";
import {
  GET_FEATURED_PRODUCTS,
  GET_SINGLE_PRODUCT,
} from "../queries/product.query";
import { categoryFormatter } from "../utils";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const createMultipleProducts = async (products: any) => {
  const token = await checkAuthorizationAdmin();

  if (!token) {
    return redirect("/");
  }

  return await getClient()?.mutate({
    mutation: CREATE_MULTIPLE_PRODUCTS,
    variables: {
      createProductInputs: products,
    },
  });
};

export const getFeaturedProducts = async (variables: GetProductsVariables) => {
  const { category, subCategory } = variables;
  const token = await getAuthorizationToken();

  return await getClient()?.query({
    query: GET_FEATURED_PRODUCTS,
    variables: {
      getHomeProductsInput: {
        ...variables,
        category: categoryFormatter(category),
        subCategory: categoryFormatter(subCategory),
      },
    },
    context: {
      headers: {
        authorization: token ? `${token}` : "",
      },
    },
  });
};

export const getSingleProduct = async (id: string) => {
  const token = await getAuthorizationToken();

  const response = await getClient()?.query({
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

  return response;
};

export const addToCart = async (formData: FormData) => {
  const productId = formData.get("productId");
  const quantity = Number(formData.get("quantity") || 1);

  const token = await getAuthorizationToken();

  const response = await getClient()?.mutate({
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
      const addToCart: Product = data?.addToCart;
      if (!addToCart) return;

      const existingProduct = cache.readQuery<{ getSingleProduct: Product }>({
        query: GET_SINGLE_PRODUCT,
        variables: {
          getSingleProductId: productId,
        },
      });

      if (existingProduct?.getSingleProduct) {
        const newProduct = {
          ...existingProduct.getSingleProduct,
          quantity: addToCart.quantity,
          isInCart: true,
        };

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

  return redirect("/cart");
};

export const toggleWishList = async (formData: FormData) => {
  const productId = formData.get("productId");
  const session = await auth();
  const token = await getAuthorizationToken();

  if (!session?.user || !productId || !token) {
    return redirect("/auth/log-in");
  }

  try {
    await getClient()?.mutate({
      mutation: TOGGLE_WISHLIST,
      variables: {
        productId,
      },
      context: {
        headers: {
          authorization: token ? `${token}` : "",
        },
      },
      update: (cache, { data }) => {
        const toggleWishlist = data?.toggleWishlist;
        const resData = toggleWishlist?.data;

        if (!resData) return;

        const productId = +resData;

        const singleProduct = cache.readQuery<{ getSingleProduct: Product }>({
          query: GET_SINGLE_PRODUCT,
          variables: {
            getSingleProductId: productId,
          },
        });

        console.log(singleProduct);
      },
    });

    revalidatePath(`/product/${productId}`);
    revalidatePath("/wishlist");
    revalidatePath("/");
  } catch (error) {}
};
