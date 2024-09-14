import { gql } from "@apollo/client";

export const LOGIN_AUTH = gql`
  query LogIn($logInAuthInput: LoginAuthInput!) {
    logIn(logInAuthInput: $logInAuthInput) {
      id
      createdAt
      email
      name
      username
      avatar
    }
  }
`;
