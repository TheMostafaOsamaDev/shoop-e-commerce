import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      price
      quantity
      subCategory
      title
      images
    }
  }
`;

export const CREATE_MULTIPLE_PRODUCTS = gql`
  query GetHomeProducts($getHomeProductsInput: GetHomeProductsInput!) {
    getHomeProducts(GetHomeProductsInput: $getHomeProductsInput) {
      category
      images {
        url
        isExternal
        id
      }
      subCategory
      quantity
      title
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String!, $quantity: Float!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      price
      quantity
      subCategory
      quantity
      title
    }
  }
`;
