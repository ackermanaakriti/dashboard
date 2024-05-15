import React, { Children, createContext, useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";
import Login from "../Pages/Login";
import MainLayout from "../Layout/MainLayout";

const MainLayoutContext = createContext();

export const MainLayoutProvider = ({ children }) => {

  const [sidebarToggle,setSidebarToggle]= useState();
  const [getId,setId]= useState()
  const [hanldeId,setHandleId]= useState(false);
  const [menuTab,setmenuTab]= useState([])
  const [  hanleInquiry,setHandleInquiry]= useState(false)
  const [voucherId,setVoucherId] = useState('');
  const [authorized,setAuthorized]= useState(false);
  const [token,setToken]= useState('')

  setToken(localStorage.getItem("token")) ;

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
      <Header/>
<div className="flex">
  <SideBar/>
  {children}
</div>
   
   <Footer/>
      
     
    </MainLayoutContext.Provider>
  );
};

export const useLayouData = () => useContext(MainLayoutContext);
