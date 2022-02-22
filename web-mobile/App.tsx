import { API_URL } from "@env";
import React from "react";
import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/header/Header";

const client = new ApolloClient({
  uri: `http://${API_URL}:4040/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("MyApplication", () => App);
