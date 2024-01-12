import React from "react";
import { BrowserRouter } from "react-router-dom";

import AdminPage from "./admin";

const App = () => {
  return (
    <BrowserRouter>
      <AdminPage />
    </BrowserRouter>
  );
};

export default App;
