import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetHomeProducts($input: GetHomeProductsInput) {
    getHomeProducts(input: $input) {
      id
      title
      price
      images {
        name
      }
      category
      subCategory
      isAddedToCart
    }
  }
`;
