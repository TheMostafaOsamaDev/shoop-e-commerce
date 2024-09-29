import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthorizationToken } from "./actions/auth.actions";

// Create the HttpLink
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include", // Include cookies if necessary
});

// For Server-Side Rendering
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
export const apolloClient = registerApolloClient?.(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
});

export const { query, getClient } = apolloClient
  ? apolloClient
  : { query: null, getClient: null };
