import React, { useState } from "react";
import { LuMenuSquare } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { useLayouData } from "../Context/MainLayoutContext";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate()
 
  const { sidebarToggle,setSidebarToggle } = useLayouData();

  const handleToggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
   
};
const [profileView,setProfileView]= useState(false)
const handleProfile =()=>
{
    setProfileView(!profileView)
    console.log(profileView)
}
const handleSingout=()=>
  {
    localStorage.removeItem('token');
    navigate('/signin')
    
  }

  return (
    <>
      <nav className="py-[10px] bg-PrimaryColor px-[30px] header z-1000">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex  gap-[28px] items-center">
              <span
                onClick={handleToggleSidebar}
                className="text-white text-[30px] cursor-pointer hamicons"
              >
                <LuMenuSquare />
              </span>
              <div>
                <figure className="h-[35px] w-[35px] mx-auto rounded-[50%] overflow-hidden">
                  <img
                    className="h-[100%] w-[100%] object-cover "
                    src="./images/user.jpg"
                    alt=""
                  />
                </figure>
                <p className="text-white text-[14px] text-center font-inter">
                  {/* <NavLink to='/signin'> Company Name</NavLink> */}
                  {/* <Link to="/branch">Link Text</Link> */}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-8 ">
              <p className="text-white text-[16px] text-center font-inter">
                (Fiscal Year- 2080/81)
              </p>
              <div onMouseEnter={()=>setProfileView(true)}  onClick={handleProfile} className="flex items-center relative gap-[10px] cursor-pointer">
                <p className="text-white text-[16px] text-center font-inter">
                  Adminstrator
                </p>
                <span className="text-[#034848] bg-[#C7E1E1] text-[30px] rounded-[50%]">
                  <FaRegUserCircle />
                </span>
              
                {profileView && (
                  <div onMouseLeave={()=>{setProfileView(false)}} className=" profileview   ">
                      <ul>
                        <li>
                          <a>Profile</a>
                        </li>
                        <li>
                          <a>Setting </a>
                        </li>
                        <li onClick={handleSingout}>
                          <a>Sign Out</a>
                        </li>
                      </ul>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
