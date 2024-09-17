import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthorizationToken } from "./actions/auth.actions";

// Create a link to set headers
const authLink = setContext(async (_, { headers }) => {
  // Get the authorization token from your function
  const token = await getAuthorizationToken();

  // Return the headers with the token
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : null,
    },
  };
});

// Create the HttpLink
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include", // Include cookies if necessary
});

// Combine the links
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
