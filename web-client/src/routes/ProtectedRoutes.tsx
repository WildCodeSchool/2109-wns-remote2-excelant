import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const useAuth: () => boolean = () => {
    const user = { loggedIn: true }
    return user && user.loggedIn;
}

const ProtectedRoutes: React.FC = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/register" />;
}

export default ProtectedRoutes;
