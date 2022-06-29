import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Theme from "./theme/Theme";
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./contexts/AuthContext";


const client = new ApolloClient({
  uri: process.env.REACT_APP_BACK_URI,
  cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <AuthProvider>
                    <CookiesProvider>
                        <SnackbarProvider>
                            <Theme>
                                <App/>
                            </Theme>
                        </SnackbarProvider>
                    </CookiesProvider>
                </AuthProvider>
            </LocalizationProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
