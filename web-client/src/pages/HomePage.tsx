import React from "react";
import {Container, Typography} from "@mui/material";

const HomePage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h1" sx={{backgroundColor: "primary.light"}}>
                HomePage
            </Typography>
        </Container>
    )
};

export default HomePage;
