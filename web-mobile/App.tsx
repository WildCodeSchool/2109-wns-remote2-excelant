import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TaskPage from "./screens/task/TaskPage";

const client = new ApolloClient({
  uri: "http://192.168.1.86:4040/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TaskPage />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("MyApplication", () => App);
