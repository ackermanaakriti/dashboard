import React, { useState, useEffect, Component } from "react";
import InquiryForm from "../Components/InquiryForm";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { removeTab } from "../Redux/TopTabSlice";
import { MenuComponentMap } from "../Data/ObjectMap";
import Dashboard from "../Components/Dashboard";
import { useLayouData } from "../Context/MainLayoutContext";


const HomeMenu = () => {
  const { hanldeId,setHandleId,}= useLayouData();
  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [MenuComponent, setmenuComponent] = useState(null);
  // tabs title
  const tabs = useSelector((state) => state.tabslice.title);
  // tabs component to render
  const component = useSelector((state) => state.tabslice.component);
  // other component
  const selectedMenuComponent = useSelector((state) => state.tabslice.menu);
  console.log(selectedComponent)


  useEffect(() => {
    setSelectedComponent(MenuComponentMap[component.menu]);
    setmenuComponent(MenuComponentMap[selectedMenuComponent]);
  }, [component.menu, selectedMenuComponent]);

  console.log(selectedMenuComponent)


  const handleTabClick = (tab) => {
    setmenuComponent(MenuComponentMap[tab]);
  };
 

  const handleDeleteTab = (menu) => {
    dispatch(removeTab(menu));
  };

  return (
    <>
      <div >
        {tabs?.map((tab, index) => (
          <button
            onClick={() => handleTabClick(tab.menu)}
            key={index}
            className="relative border-solid border-[1px] border-PrimaryColor mx-[8px] px-[11px] py-[6px] "
          >
            {tab.menu}
            <span onClick={() => handleDeleteTab(index)} className=" absolute w-[100%] top-[20%]  text-[12px]">
              <RxCross1 />
            </span>
          </button>
        ))}
      </div>
      <div className="relative">


        {MenuComponent ? MenuComponent : (selectedComponent ?selectedComponent : <Dashboard/>)}
        {/* {MenuComponent ? MenuComponent : selectedComponent} */}
      </div>
      <InquiryForm />
    </>
  );
};

export default HomeMenu;
