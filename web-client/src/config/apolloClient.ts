import {ApolloClient} from "@apollo/client";
import {InMemoryCache} from "@apollo/client";
import {ApolloLink} from "@apollo/client";
import {HttpLink} from "@apollo/client";
import {useAuthToken} from "../hooks/useAuthToken";

const httpLink = new HttpLink({uri: "http://localhost:4040/graphql"});

const authMiddleware = (authToken: string) =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
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
