import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const testAuthToken: () => boolean = () => {
    const user =  { loggedIn: true }
    return user && user.loggedIn;
}

const ProtectedRoutes: React.FC = ({ children }) => {
    const { authToken }: any  = useContext(AuthContext);
    // const isAuth = testAuthToken();
    return authToken ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
