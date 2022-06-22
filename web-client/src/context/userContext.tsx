import React, { createContext } from "react";
import { UserType } from "../_types/_userTypes";

interface UserContextValues {
    user: UserType
}

const userValues: UserContextValues = {
    user: {
        name: "",
        email: "",
    },
}

const UserContext = createContext<UserContextValues>(userValues);

export default UserContext;
