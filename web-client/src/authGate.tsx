import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import GqlRequest from "./_graphql/GqlRequest";
import useAuthToken from "./hooks/useAuthToken";

const AuthGate = () => {
  const navigate = useNavigate();

  // Using our authToken. Can be undefined
  const [authToken] = useAuthToken();

  // Trying to fetch our user data. Will fail if authToken is undefined
  const userData = useQuery(new GqlRequest("User").getOne("name, email"));

  // If both are loaded, we serve our app
  if (userData.data && authToken) {
    // TODO: redirect user on private routes
  }

  // Otherwise, we diplay the login form
  return navigate("/login");
};

export default AuthGate;
