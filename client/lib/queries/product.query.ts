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
      isInWishlist
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
      isInWishlist
      images {
        id
        isExternal
        publicId
        url
      }
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    getCart {
      id
      productId
      userId
      createdAt
      updatedAt
      quantity
      product {
        id
        title
        price
        quantity
        category
        subCategory
        images
      }
    }
  }
`;
