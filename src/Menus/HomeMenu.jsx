import React, { useState, useEffect } from "react";
import { useLayouData } from "../Context/MainLayoutContext";
import CollegeMenu from "./CollegeMenu";
import Schoolmenu from "./Schoolmenu";
import InquiryForm from "../Components/InquiryForm";
import EditForm from '../Components/EditForm'


const MenuComponetMap = {
  Colleges: <CollegeMenu />,
  School: <Schoolmenu />,
  tableform: <Schoolmenu />,
  gotoTable: <CollegeMenu />,
  EditForm: <EditForm/>
};

const HomeMenu = () => {
  const [SelectedCompo, setSlectedComponent] = useState(null);

  const {
    menuComponent,
    setmenuComponent,
    gotoComp,
    setGotoComp,
    hanleInquiry,
    setHandleInquiry,
  } = useLayouData();

  useEffect(() => {
    setSlectedComponent(MenuComponetMap[menuComponent]);
  }, [menuComponent]);
 
  return (
    <>
     
      <div className="relative">{SelectedCompo}</div>
      <InquiryForm/>
 


    </>
  );
};

export default HomeMenu;
