import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const useAuth: () => boolean = () => {
    const user = { loggedIn: false }
    return user && user.loggedIn;
}

const ProtectedRoutes: React.FC<{user: any}> = ({ user }) => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/register" />;
}

export default ProtectedRoutes;
