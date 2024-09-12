import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createAuthInput: CreateAuthInput!) {
    createUser(createAuthInput: $createAuthInput) {
      id
      email
      name
      avatar
      username
      createdAt
    }
  }
`;
