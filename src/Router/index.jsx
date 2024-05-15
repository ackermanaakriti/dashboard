import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Protected from "./ProtectedRoutes";
import Dashboard from "../Components/Dashboard";
import Login from "../Pages/Login";
import BankForm from "../Menus/Bank/BankForm";
import Footer from "../Components/Footer";
import MainLayout from "../Layout/MainLayout";
import BranchTable from "../Menus/BranchMenu/BranchTable";
import { MainLayoutProvider } from "../Context/MainLayoutContext";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";

const Routess = () => {
  return (
    <Router>
      <Header />
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Protected />}>
            <Route index element={<Dashboard />} />
            <Route path="branch" element={<BranchTable />} />
          </Route>
          <Route path="signin" element={<Login />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default Routess;
