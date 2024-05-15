// Router.js

import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Protected from "./ProtectedRoutes";
import Dashboard from "../Components/Dashboard";
import Login from "../Pages/Login";
import BankForm from "../Menus/Bank/BankForm";
import Footer from "../Components/Footer";
import MainLayout from "../Layout/MainLayout";
import BranchTable from "../Menus/BranchMenu/BranchTable";
import { MainLayoutProvider } from "../Context/MainLayoutContext";

const token = localStorage.getItem('token')

const routes = createRoutesFromElements(
  <Route path="/">
    <Route element={<Protected />}>
      <Route index element={<MainLayout/> } />
      <Route path='branch' element={<BranchTable token={token}/>}/>
       


    </Route>
    <Route path="signin" element={<Login />} />
    {/* <Route path="/bank" element={<BankForm/>}/> */}
    <Route path="*" element={<h1>Page not found</h1>} />
  </Route>
);

const router = createBrowserRouter(routes);

const Routes = () => {
  return (
  
  <RouterProvider router={router} />
  ) ;
};

export default Routes;
