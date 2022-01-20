import React from "react";
import { gql, useQuery } from "@apollo/client";
import {Container} from "@mui/material";

const HomePage: React.FC = () => {
  const TEST = gql`
    query Query {
      hello
    }
  `;

  const { loading, data } = useQuery(TEST);

  return loading ? (
    <p>Loading...</p>
  ) : (
      <Container maxWidth="lg">
      <h1  style={{ backgroundColor: '#cfe8fc'}}>
          HomePage
        </h1>
      </Container>
  );
};

export default HomePage;
