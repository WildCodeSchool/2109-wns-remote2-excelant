import React, { createContext, useState } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

export const AuthContext = createContext({});

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [authToken] = useAuthToken();
    const [authed, setAuthed] = useState<boolean>(false);

    const loggedIn: () => void = () => {
        if (authToken) {
            setAuthed(true);
        }
    };

    const authContextValue = {
        authed,
        setAuthed,
        authToken,
        loggedIn
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
