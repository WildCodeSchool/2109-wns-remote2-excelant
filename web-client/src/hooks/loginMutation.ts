import { gql, FetchResult, MutationResult, useMutation } from "@apollo/client";

export const loginMutationGQL = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        _id
        name
        email
        roles
      }
      accessToken
    }
  }
`;

export const useLoginMutation: <TData>() => [
  (email: string, password: string) => Promise<FetchResult<TData>>,
  MutationResult<TData>
] = () => {
  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      const { login } = data;
      localStorage.setItem("accessToken", login.accessToken);
    },
  });

  // We have rewritten the function to have a cleaner interface
  const login = (email: string, password: string) =>
    mutation({
      variables: {
        email,
        password,
      },
    });

  return [login, mutationResults];
};
