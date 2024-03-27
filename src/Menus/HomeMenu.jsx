import React, { useState, useEffect, Component } from "react";
import { useLayouData } from "../Context/MainLayoutContext";
import CollegeMenu from "./CollegeMenu";
import Schoolmenu from "./Schoolmenu";
import InquiryForm from "../Components/InquiryForm";
import EditForm from "../Components/EditForm";
import MenustopTab from "./MenustopTab";
import { useDispatch, useSelector } from "react-redux";
import Hospital from "./Hospital";
import Hotel from "./Hotel";
import { FaCross } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { addMenu, addTab, removeTab } from "../Redux/TopTabSlice";
import Dashboard from "../Dashboard";

const MenuComponentMap = {
  Colleges: CollegeMenu,
  Hotel: Hotel,
  School: Schoolmenu,
  Hospital: Hospital,
 
};

const HomeMenu = () => {

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [MenuComponent,setmenuComponent]= useState(null)
  // tabs title
  const tabs = useSelector((state) => state.tabslice.title);
  // tabs component to render
  const component = useSelector((state) => state.tabslice.component);
  // other component
  const selectedMenuComponent = useSelector((state) => state.tabslice.menu);
  const dispatch = useDispatch();
  console.log(tabs)

  useEffect(() => {
   
    setSelectedComponent(MenuComponentMap[component.menu]);
    setmenuComponent(MenuComponentMap[selectedMenuComponent]);
  }, [component, selectedMenuComponent]); 
  

  // show component on clicking the button
  const handleTabClick = (tab) => {
    setmenuComponent(MenuComponentMap[tab])
  };
  // to hide the component after the clicking delete icon

  const handleDeleteTab = (menu) => {
    dispatch(removeTab(menu));
 
  };

  return (
    <>
      <div>
        {tabs?.map((tab, index) => (
          <button
            onClick={() => handleTabClick(tab.menu)}
            key={index}
            className="relative border-solid border-[1px] border-PrimaryColor mx-[8px] px-[11px] py-[10px]"
          >
            {tab.menu}
            <span onClick={() => handleDeleteTab(index)} className="absolute">
              <RxCross1 />
            </span>
          </button>
        ))}
      </div>
      <div className="relative"> {MenuComponent ? MenuComponent : selectedComponent}</div>
      <InquiryForm />
    </>
  );
};

export default HomeMenu;
