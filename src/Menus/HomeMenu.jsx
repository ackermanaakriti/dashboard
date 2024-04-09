import React, { useState, useEffect } from "react";
import InquiryForm from "../Components/InquiryForm";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { addTab, removeTab } from "../Redux/TopTabSlice";
import { MenuComponentMap } from "../Data/ObjectMap";
import Dashboard from "../Components/Dashboard";
import { useLayouData } from "../Context/MainLayoutContext";

const HomeMenu = () => {
  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activebtn, setActivebn] = useState(false);

  // tabs title
  const tabs = useSelector((state) => state.tabslice.title);
  // tabs component to render
  const component = useSelector((state) => state.tabslice.component);

  useEffect(() => {
    setSelectedComponent(MenuComponentMap[component]);
    setActivebn(component);
  }, [component]);

  const handleTabClick = (tab, index) => {
    dispatch(addTab({ id: index, menu: tab }));
    setActivebn(tab);
    console.log(activebtn);
  };

  const handleDeleteTab = (index) => {
    dispatch(removeTab({ id: index }));
    // console.log(index)
  };

  return (
    <>
      <div className="flex">
        {tabs?.map((tab, index) => (
          
          
            <button
              onClick={() => handleTabClick(tab.menu, index)}
              key={index}
              className={`flex items-center rounded-[8px] m-[20px] border-solid border-[1px] border-PrimaryColor mx-[8px] px-[11px] py-[6px] ${
                activebtn === tab.menu ? "bg-[#95bfbf]" : "bg-[#e9f1f3]"
              }`} 
              >
              {tab.menu}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTab(index);
                }}
                className="  ml-[10px]   text-[12px]"
               >
              <RxCross1 />
              </span>
            </button>
           
            
         
        ))}
      </div>
      <div className="relative">
        {selectedComponent ? selectedComponent : <Dashboard />}
      </div>
      <InquiryForm />
    </>
  );
};

export default HomeMenu;
