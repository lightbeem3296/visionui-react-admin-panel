import React from "react";

import { Routes, Route } from "react-router-dom";

import { Card, CardBody } from "@material-tailwind/react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Creedians from "./Creedians";
import ChargeLog from "./ChargeLog";
import UseLog from "./UseLog";

export default function AdminPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)]">
        <Header />
        <div className="overflow-auto h-[calc(100vh-4.5rem)] w-full">
          <Routes>
            <Route path="/" element={<Creedians />} ></Route>
            <Route path="/creedians" element={<Creedians />} ></Route>
            <Route path="/charge_log" element={<ChargeLog />} ></Route>
            <Route path="/use_log" element={<UseLog />} ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
