import React from "react";

import { BrowserRouter } from "react-router-dom";
import Admin from "./admin";

import "primereact/resources/themes/lara-dark-blue/theme.css";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
