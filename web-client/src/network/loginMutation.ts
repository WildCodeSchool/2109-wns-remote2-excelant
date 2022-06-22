import { gql, useMutation } from "@apollo/client";
import { useAuthToken } from "../hooks/useAuthToken";

export const loginMutationGQL = gql`
        mutation login($email: String!, $password: String!) {
            login(input: { email: $email, password: $password })
        }
    `;

export const useLoginMutation = () => {
    const [_, setAuthToken] = useAuthToken();

    const [mutation, mutationResults] = useMutation(loginMutationGQL, {
        // If the mutation succeed, we save the token for later
        onCompleted: (data) => {
            setAuthToken(data.login)
        },
    });

    // We have rewritten the function to have a cleaner interface
    const login = (user: any, password: string) => {
        return mutation({
            variables: {
                login: user,
                password
            },
        });
    }
    return [login, mutationResults]
}
