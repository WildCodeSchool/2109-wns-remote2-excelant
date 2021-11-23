import React from "react";
import { gql, useQuery } from "@apollo/client";
import logo from "../logo.svg";

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {data ? <p>{data.hello}</p> : <p>error: server is down</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default HomePage;
