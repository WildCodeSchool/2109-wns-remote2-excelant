import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App(): ReactJSXElement {
  return (
    <Router>
      <Routes>
        {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
