import React, { createContext, useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";

const MainLayoutContext = createContext();

export const MainLayoutProvider = ({ children }) => {
  const [sidebarToggle,setSidebarToggle]= useState(false);
  const [getId,setId]= useState('')
  const [hanldeId,setHandleId]= useState(false);
  const [menuTab,setmenuTab]= useState([])
  const [hanleInquiry,setHandleInquiry]= useState(false)
  const [voucherId,setVoucherId] = useState('');
  const [authorized,setAuthorized]= useState(false);
  const [token,setToken]= useState(localStorage.getItem("token"));

  return (
    <MainLayoutContext.Provider
      value={{
        getId,setId,
        hanldeId,setHandleId,
        menuTab,setmenuTab,
        sidebarToggle,setSidebarToggle,
        hanleInquiry,setHandleInquiry,
        voucherId,setVoucherId,
        authorized,setAuthorized,
        token,setToken
      }}
    >
      
        {children}
     
        
    
    </MainLayoutContext.Provider>
  );
};

export const useLayouData = () => useContext(MainLayoutContext);