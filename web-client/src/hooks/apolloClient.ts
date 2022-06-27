import {ApolloClient} from "@apollo/client";
import {InMemoryCache} from "@apollo/client";
import {ApolloLink} from "@apollo/client";
import {HttpLink} from "@apollo/client";
import {useAuthToken} from "./useAuthToken";

const httpLink = new HttpLink({uri: "http://localhost:4040/graphql"});

// Passing auth token in our queries
const authMiddleware = (authToken: string) =>
    new ApolloLink((operation, forward) => {

        // Add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                }
            })
        }
        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    const [authToken] = useAuthToken();
    return new ApolloClient({
        link: authMiddleware(authToken).concat(httpLink),
        credentials: "include",
        cache,
    });
}
