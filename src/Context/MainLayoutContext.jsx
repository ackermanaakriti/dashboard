import React, { createContext, useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";

const MainLayoutContext = createContext();

export const MainLayoutProvider = ({ children }) => {
  const [sidebarToggle,setSidebarToggle]= useState(false);
  const [hanleInquiry,setHandleInquiry]= useState(false)
  const [authorized,setAuthorized]= useState(false);
  const [token,setToken]= useState(localStorage.getItem("token"));
  const [DeleteList,setDeleteList]= useState(false)

  return (
    <MainLayoutContext.Provider
      value={{

        sidebarToggle,setSidebarToggle,
        hanleInquiry,setHandleInquiry,
        authorized,setAuthorized,
        token,setToken,
        DeleteList,setDeleteList

      }}
    >
      
        {children}
     
        
    
    </MainLayoutContext.Provider>
  );
};

export const useLayouData = () => useContext(MainLayoutContext);