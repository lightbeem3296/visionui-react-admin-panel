import React from "react";

import { Routes, Route } from "react-router-dom";
import Creedians from './Creedians';
import ChargeLog from './ChargeLog';
import UseLog from './UseLog';
import NavBar from "./Navbar";

const Admin = () => {
  return (
    <div>
      Admin page
      <NavBar />
      <hr />
      <Routes>
        <Route path="/" exact={true} element={<Creedians />}></Route>
        <Route path="/creedians" element={<Creedians />} ></Route>
        <Route path="/charge_log" element={<ChargeLog />} ></Route>
        <Route path="/use_log" element={<UseLog />} ></Route>
      </Routes>
    </div>
  );
};

export default Admin;
