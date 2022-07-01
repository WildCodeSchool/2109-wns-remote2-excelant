import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import useAuthToken from "./useAuthToken";

const httpLink = new HttpLink({
  uri: "http://localhost:4040/graphql",
  credentials: "include",
});

const authMiddleware = (authToken: string) =>
  new ApolloLink((operation, forward) => {
    // Add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }
    return forward(operation);
  });

const cache = new InMemoryCache({});

export default function useAppApolloClient() {
  const [authToken] = useAuthToken();

  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    credentials: "include",
    cache,
  });
}
