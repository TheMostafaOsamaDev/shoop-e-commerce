import { getAuthorizationToken } from "./actions/auth.actions";
import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  const token = getAuthorizationToken();

  // console.log("Token: ", token);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GRAPHQL_URL,
    }),
  });
});
