import React, { useState, useEffect } from "react";
import { useLayouData } from "../Context/MainLayoutContext";
import CollegeMenu from "./CollegeMenu";
import Schoolmenu from "./Schoolmenu";
import InquiryForm from "../Components/InquiryForm";
import EditForm from '../Components/EditForm'
import MenustopTab from "./MenustopTab";
import { useSelector } from "react-redux";
import Hospital from "./Hospital";
import Hotel from "./Hotel";
import { FaCross } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";



const MenuComponetMap = {
  Colleges: <CollegeMenu />,
  Hotel: <Hotel/>,
  School: <Schoolmenu />,
  Hospital: <Hospital />,
  EditForm: <EditForm/>
 
};

const HomeMenu = () => {
  const [SelectedCompo, setSlectedComponent] = useState(null);
  const tabs = useSelector(state => state.tabslice.title);


  console.log(tabs)

  const {
    menuComponent,
    setmenuComponent,
    gotoComp,
    setGotoComp,
    hanleInquiry,
    setHandleInquiry,
    menuTab,setmenuTab
  } = useLayouData();

  useEffect(() => {
   
    setSlectedComponent(MenuComponetMap[tabs]);
  }, [tabs]);
  console.log(SelectedCompo)
  const [activeTabs,setActiveTabs] = useState(false)
 
  const handleTabs =(item)=>
  {
 setActiveTabs(item)
 setSlectedComponent(MenuComponetMap[item]);
  }
  return (
    <>
     

     <div>
        {tabs?.map((item, index) => (
          <button onClick={()=>handleTabs(item)} key={index} className=" relative border-solid border-[1px] border-PrimaryColor mx-[8px] px-[11px] py-[10px]">
            {item}
            <span className="absolute"><RxCross1/></span>
          </button>
        ))}
      </div>
      <div className="relative"> {SelectedCompo}</div>
      <InquiryForm/>
 


    </>
  );
};

export default HomeMenu;
