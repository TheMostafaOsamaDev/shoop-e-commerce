// import { getClient } from "../apollo-client";
// import {
//   CREATE_MULTIPLE_PRODUCTS,
//   CREATE_PRODUCT,
// } from "../mutations/product.mutations";
// import { GET_PRODUCTS } from "../queries/product.query";

// export const createProduct = async (
//   createProductInput: Omit<Product, "id">
// ) => {
//   const { data } = await getClient().mutate({
//     mutation: CREATE_PRODUCT,
//     variables: {
//       createProductInput: createProductInput,
//     },
//   });
// };

// export const createMultipleProducts = async (
//   createProductInputs: Omit<Product, "id">[]
// ) => {
//   const data = createProductInputs.map((input) => {
//     console.log("----------------- input -----------------");
//     console.log(input.title);
//   });

//   const {} = await getClient().mutate({
//     mutation: CREATE_MULTIPLE_PRODUCTS,
//     variables: {
//       createProductInputs: createProductInputs,
//     },
//   });
// };

// // Get products
// export const getProducts = async ({
//   limit,
//   pageIndex,
//   category,
//   subCategory,
// }: {
//   limit?: number;
//   pageIndex?: number;
//   category?: string;
//   subCategory?: string;
// }) => {
//   console.log({
//     limit,
//     pageIndex,
//     category,
//     subCategory,
//   });
//   const { data } = await getClient().query({
//     query: GET_PRODUCTS,
//     variables: {
//       input: {
//         limit,
//         pageIndex,
//         category,
//         subCategory,
//       },
//     },
//   });
//   return data;
// };
