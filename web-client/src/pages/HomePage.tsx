import React from "react";
import {Container, Typography} from "@mui/material";
import UserContext from "../context/userContext";
import {UserType} from "../_types/_userTypes";

const HomePage: React.FC<{ user: UserType }> = ({user}) => {
    console.log(user);
    return (
        <UserContext.Provider value={{user: user}}>
            <Container maxWidth="lg">
                <Typography variant="h1" sx={{backgroundColor: "primary.light"}}>
                    HomePage
                </Typography>
            </Container>
        </UserContext.Provider>
    )
};

export default HomePage;
