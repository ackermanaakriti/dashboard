import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { footerimg } from "../Data/Footerimg";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useLayouData } from "../Context/MainLayoutContext";


const Footer = () => {
  const {hanleInquiry,setHandleInquiry}= useLayouData()
  const handleInquiry =()=>
  {
       setHandleInquiry(!hanleInquiry)
  }
  return (
    <>
      <div className="footer relative bg-SecondaryColor">
        <div className="flex justify-between items-center h-[100%]">
          <div className="flex items-center  px-[20px] firstdiv gap-[15px]  bg-PrimaryColor">
            <p className="text-white text-[15px] text-center font-inter">
              Powered By Onviro Tech
            </p>
            <figure className="h-[35px] w-[35px] rounded-[50%] overflow-hidden ">
              <img
                className="h-[100%] w-[100%] object-cover"
                src="./images/user.jpg"
                alt=""
              />
            </figure>
          </div>
          <div className="flex justify-around gap-[10rem] ">
            {footerimg.map((img, index) => (
              <figure className="h-[30px]">
                <img className="h-[100%]" src={img.image} alt="" />
              </figure>
            ))}
          </div>
          <div className="bg-PrimaryColor secondiv px-8">
          <div className="flex gap-[10px] items-center h-[100%] ">
            <span className="footer-icon"><FaPhone/></span>
            <p>9875328690</p>
          </div>
          <div className="flex gap-[10px] items-center h-[100%] ">
            <span className="footer-icon"><FaEnvelope/></span>
            <p>onviro@gmail.com</p>
          </div>
              <div>
              <span  onClick={handleInquiry} className="footer-icon cursor-pointer"><TfiHeadphoneAlt/></span>
              </div>
             
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
