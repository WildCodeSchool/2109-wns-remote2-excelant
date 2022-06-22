import GqlRequest from "./_graphql/GqlRequest";
import { useQuery } from "@apollo/client";
// Import routes
import { Link, Navigate } from "react-router-dom";
// import { Login } from "./components/form/Login";
import { useAuthToken } from "./hooks/useAuthToken";

export const AuthGate = () => {

    // Using our authToken. Can be undefined
    const [authToken] = useAuthToken();

    // Trying to fetch our user data. Will fail if authToken is undefined
    const userData = useQuery(new GqlRequest("User").getOne(
        "name, email"
    ));
    console.log(authToken);
    console.log(userData);

    // if (userData.data && authToken) {
    //     return <Link to="/" user={} />
    // }
}