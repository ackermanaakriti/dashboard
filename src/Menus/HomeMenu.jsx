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
import { removeTab } from "../Redux/TopTabSlice";

const MenuComponentMap = {
  Colleges: CollegeMenu,
  Hotel: Hotel,
  School: Schoolmenu,
  Hospital: Hospital,
  EditForm: EditForm,
};

const HomeMenu = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const tabs = useSelector((state) => state.tabslice.title);
    const component = useSelector((state) => state.tabslice.component);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tabs.length > 0) {
      const initialTab = tabs[0];
      setSelectedComponent(MenuComponentMap[component]);
    }
  }, [tabs]);

  const handleTabClick = (tab) => {
    setSelectedComponent(MenuComponentMap[tab]);
  };
  const handleDeleteTab = (tab) => {
    const tabIndex = tabs.findIndex((t) => t === tab);

    if (tabIndex !== -1) {
      dispatch(removeTab(tab));

      if (selectedComponent === MenuComponentMap[tab]) {
        setSelectedComponent(null);
      }
    }
  };

  return (
    <>
      <div>
        {tabs.map((tab, index) => (
          <button
            onClick={() => handleTabClick(tab)}
            key={index}
            className="relative border-solid border-[1px] border-PrimaryColor mx-[8px] px-[11px] py-[10px]"
          >
            {tab}
            <span onClick={() => handleDeleteTab(tab)} className="absolute">
              <RxCross1 />
            </span>
          </button>
        ))}
      </div>
      <div className="relative"> {selectedComponent}</div>
      <InquiryForm />
    </>
  );
};

export default HomeMenu;
