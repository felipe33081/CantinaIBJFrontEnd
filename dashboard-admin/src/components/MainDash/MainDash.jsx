import React from "react";
import Table from "../Table/Table";
import Dashboard from "../Dashboard/Dashboard";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <Dashboard/>
      <Table />
    </div>
  );
};

export default MainDash;
