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
      id
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($getSingleProductId: String!) {
    getSingleProduct(id: $getSingleProductId) {
      id
      price
      quantity
      subCategory
      title
      category
      isInCart
      images {
        id
        isExternal
        publicId
        url
      }
    }
  }
`;
