import React from "react";
import Header from "../Global/Header";
import Footer from "../Global/Footer";
import SideBar from "../Global/SideBar";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-grow p-[30px] w-[80%]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthenticatedLayout;
