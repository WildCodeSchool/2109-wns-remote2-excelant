import React from "react";
import { gql, useQuery } from "@apollo/client";

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
    <div className="App">
        HomePage
    </div>
  );
};

export default HomePage;
