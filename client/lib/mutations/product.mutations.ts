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
