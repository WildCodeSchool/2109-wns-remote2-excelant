import React from 'react';
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { gql, useQuery } from '@apollo/client';
import logo from './logo.svg';
import "./App.scss";
import "./Variables/_variables.scss";

const TEST = gql`
  query Query {
    hello
  }
`;

function App(): ReactJSXElement {
  const { loading, data } = useQuery(TEST);

  return loading ? (
    <p>Loading...</p> ) : 
    data && (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { data.hello }
        </p>
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
}

export default App;
