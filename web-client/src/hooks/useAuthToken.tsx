import { useCookies } from "react-cookie";

const TOKEN_NAME = "accessToken";

// Custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {
  // We use react-cookies to access our cookies
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

  // This function allows to save any string in our cookies, under the key "authToken"
  const setAuthToken = (authToken: string) => {
    setCookie(TOKEN_NAME, authToken);
  };

  // This function removes the key "authToken" from our cookies. Useful to logout
  const removeAuthToken = () => removeCookie(TOKEN_NAME);

  return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};

export default useAuthToken;
