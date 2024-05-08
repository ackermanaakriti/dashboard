import React, { createContext, useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";
import Login from "../Pages/Login";

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

      {authorized ?( <> <Header />
      <div className="flex">
        <div>
        <SideBar />
        </div>
        {/* 'calc(100% - 268px)' */}
       
      

        <div style={{ width: sidebarToggle ? 'calc(100% - 80px)' : 'calc(100% - 268px)' }} className="items-center">{children}</div>
      </div>
      <Footer />
      </>) : <Login/> }

      
      {/* <> <Header />
      <div className="flex">
        <SideBar />

        <div className="w-[100%]">{children}</div>
      </div>
      <Footer />
      </> */}
      
     
    </MainLayoutContext.Provider>
  );
};

export const useLayouData = () => useContext(MainLayoutContext);
