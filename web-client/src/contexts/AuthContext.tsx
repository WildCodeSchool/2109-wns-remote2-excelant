import React, { createContext, useState } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

export const AuthContext = createContext({});

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [authToken, setAuthToken] = useAuthToken();
    const [authed, setAuthed] = useState<boolean>(false);

    const loggedIn = () => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            setAuthed(true);
        }
    };

    const authContextValue = {
        authed,
        setAuthed,
        authToken,
        setAuthToken,
        loggedIn
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
