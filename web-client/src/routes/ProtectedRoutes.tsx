import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes: React.FC = () => {
    const { authToken }: any  = useContext(AuthContext);
    return authToken ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
