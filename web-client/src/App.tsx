import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import BaseRoutes from "./routes/BaseRoutes";
import "./App.scss";
import "./Variables/_variables.scss";

function App(): ReactJSXElement {
  return <BaseRoutes />;
}

export default App;
