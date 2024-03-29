import React, { createContext, useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";
import CollegeMenu from "../Menus/CollegeMenu";
import Schoolmenu from "../Menus/Schoolmenu";
const MainLayoutContext = createContext();

export const MainLayoutProvider = ({ children }) => {

  const [sidebarToggle,setSidebarToggle]= useState();
  const [getId,setId]= useState()
  const [hanldeId,setHandleId]= useState(false);
  const [menuTab,setmenuTab]= useState([])
  const [  hanleInquiry,setHandleInquiry]= useState(false)



  return (
    <MainLayoutContext.Provider
      value={{
        
        getId,setId,
        hanldeId,setHandleId,
        menuTab,setmenuTab,
        sidebarToggle,setSidebarToggle,
        hanleInquiry,setHandleInquiry
        
      }}
    >
      <Header />
      <div className="flex">
        <SideBar />

        <div className="w-[100%]">{children}</div>
      </div>
      <Footer />
    </MainLayoutContext.Provider>
  );
};

export const useLayouData = () => useContext(MainLayoutContext);
