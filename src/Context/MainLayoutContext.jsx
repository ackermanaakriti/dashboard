import React, { createContext, useContext, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SideBar from "../Components/SideBar";
import CollegeMenu from "../Menus/CollegeMenu";
import Schoolmenu from "../Menus/Schoolmenu";
const MainLayoutContext = createContext();

export const MainLayoutProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuComponent, setmenuComponent] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [menuOpen, setMenuOpen] = useState("");
  const [gotoComp, setGotoComp] = useState();
  const [menuClose, setMenuClose] = useState(false);
  const [sidebarToggle,setSidebarToggle]= useState();
  const [hanleInquiry,setHandleInquiry]= useState(false);
  const [getId,setId]= useState()
  const [hanldeId,setHandleId]= useState(false);
  const [menuTab,setmenuTab]= useState()


  return (
    <MainLayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
        menuComponent,
        gotoComp,
        setGotoComp,
        setmenuComponent,
        submittedData,
        setSubmittedData,
        menuOpen,
        setMenuOpen,
        menuClose,setMenuClose,
        sidebarToggle,setSidebarToggle,
        hanleInquiry,setHandleInquiry,
        getId,setId,
        hanldeId,setHandleId,
        menuTab,setmenuTab
        
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
