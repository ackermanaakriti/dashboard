import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";
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
