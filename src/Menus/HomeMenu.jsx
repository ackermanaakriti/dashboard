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

  // tabs title
  const tabs = useSelector((state) => state.tabslice.title);
  // tabs component to render
  const component = useSelector((state) => state.tabslice.component);




  useEffect(() => {
    setSelectedComponent(MenuComponentMap[component]);
   
  }, [component ]);

console.log(selectedComponent);

  const handleTabClick = (tab,index) => {
    dispatch(addTab({ id:index, menu:tab}))
  };
 

  const handleDeleteTab = (menu) => {
    dispatch(removeTab(menu));
  };

  return (
    <>
      <div >
        {tabs?.map((tab, index) => (
          <button
            onClick={() => handleTabClick(tab.menu,index)}
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


        {selectedComponent}
      </div>
      <InquiryForm />
    </>
  );
};

export default HomeMenu;
