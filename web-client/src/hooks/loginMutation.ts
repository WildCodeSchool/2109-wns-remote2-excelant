import {gql, MutationResult, useMutation} from "@apollo/client";
import { useAuthToken } from "./useAuthToken";

export const loginMutationGQL = gql`
        mutation login($email: String!, $password: String!) {
            login(input: { email: $email, password: $password })
        }
    `;

export const useLoginMutation: () => [(email: string, password: string) => Promise<any>, MutationResult<any>] = () => {
    const [_, setAuthToken, removeAuthToken] = useAuthToken();

    const [mutation, mutationResults] = useMutation(loginMutationGQL, {
        // If the mutation succeed, we save the token for later
        onCompleted: (data) => {
            setAuthToken(data.login)
        },
    });

    // We have rewritten the function to have a cleaner interface
    const login = (email: string, password: string) => {
        removeAuthToken();
        return mutation({
            variables: {
                email,
                password
            },
        });
    }
    return [login, mutationResults]
};
