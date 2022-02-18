import { API_URL } from "@env";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./components/header/Header";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const client = new ApolloClient({
  uri: API_URL,
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
