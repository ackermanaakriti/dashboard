import React, { createContext, useContext, useState } from "react";


const MainLayoutContext = createContext();

export const MainLayoutProvider = ({ children }) => {
  const [sidebarToggle,setSidebarToggle]= useState(false);
  const [handleInquiryShow,setHandleInquiryShow]= useState(false)
  const [authorized,setAuthorized]= useState(false);
  const [token,setToken]= useState(localStorage.getItem("token"));
  const [DeletePopupShow,setDeletePopupShow]= useState(false)
  const [formDirty,setFormDirty] = useState(false)

  return (
    <MainLayoutContext.Provider
      value={{

        sidebarToggle,setSidebarToggle,
        handleInquiryShow,setHandleInquiryShow,
        authorized,setAuthorized,
        token,setToken,
        DeletePopupShow,setDeletePopupShow,
        formDirty,setFormDirty

      }}
    >
      
        {children}
     
        
    
    </MainLayoutContext.Provider>
  );
};

export const useLayouData = () => useContext(MainLayoutContext);