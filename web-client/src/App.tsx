import React from 'react';
import { gql, useQuery } from '@apollo/client';
import logo from './logo.svg';
import './App.css';

const TEST = gql`
  query Query {
    hello
  }
`;

function App() {
  const { loading, data } = useQuery(TEST);
  if (loading) return <p>Loading...</p>;

  return (
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
