import { gql } from "@apollo/client";

export const GET_FEATURED_PRODUCTS = gql`
  query GetHomeProducts($getHomeProductsInput: GetHomeProductsInput!) {
    getFeaturedProducts(GetHomeProductsInput: $getHomeProductsInput) {
      category
      images {
        url
        isExternal
        id
      }
      subCategory
      quantity
      title
      price
    }
  }
`;
