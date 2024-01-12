import React from "react";
import { Button } from "@material-tailwind/react";

import { Routes, Route } from "react-router-dom";
import ChargeLog from './ChargeLog';

const Admin = () => {
  return (
    <div>
      Admin page
      <Button>Button</Button>
      <hr />
      <Routes>
        <Route path="/charge_log" element={<ChargeLog />} ></Route>
      </Routes>
    </div>
  );
};

export default Admin;
