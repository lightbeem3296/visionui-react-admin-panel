import React from "react";

import { BrowserRouter } from "react-router-dom";
import Admin from "./admin";

const App = () => {
  return (
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  );
};

export default App;
