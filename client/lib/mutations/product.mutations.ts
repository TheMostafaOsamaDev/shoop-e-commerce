import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      title
      price
      quantity
      images
      category
      subCategory
    }
  }
`;

export const CREATE_MULTIPLE_PRODUCTS = gql`
  mutation createMultipleProducts(
    $createProductInputs: [CreateProductInput!]!
  ) {
    createMultipleProducts(createProductInputs: $createProductInputs) {
      id
      title
      price
      quantity
      images
      category
      subCategory
    }
  }
`;
