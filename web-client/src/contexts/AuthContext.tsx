import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = () => {
    // Define login state for users
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    // Change loggedIn state
    useEffect(() => {

    }, []);

    const authContextValue = {
        loggedIn,
        setLoggedIn
    }

    return <AuthContext.Provider value={authContextValue} />;
}

export default AuthProvider;
