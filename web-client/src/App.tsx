import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import "./App.scss";
import "./variables/_variables.scss";
import { ApolloProvider } from "@apollo/client";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import BaseRoutes from "./routes/BaseRoutes";
import useApolloClient from "./hooks/apolloClient";
import Theme from "./theme/Theme";

function App(): ReactJSXElement {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Theme>
          <BaseRoutes />
        </Theme>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
