import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import { useLayouData } from '../Context/MainLayoutContext';
import { LuMenuSquare } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MenuData } from '../Data/Menudata';





const SideBar = () => {
    const {collapsed,setCollapsed ,menuComponent,setmenuComponent} = useLayouData()
    console.log(menuComponent)
 
   
  return (
    <div className='sidebar'>
      <div style={{ display: 'flex', height: '100%' }}>
    
    <Sidebar collapsed={collapsed}>
      <Menu>
        <MenuItem className='text-blue text-[15px]  font-inter font-semibold' icon={<MdDashboard className='text-[30px]'/>}>Dashboard</MenuItem>
        {MenuData?.map((menus,index)=>
        (
          <SubMenu onClick={()=>setmenuComponent(menus.menu)}  className='text-blue text-[16px] font-inter font-semibold' 
          expandIcon={<FaChevronRight className='text-[30px]' />}
         label={menus.menu} icon={ <LuMenuSquare className='text-[26px]'/>}>
          {
            menus?.submenu?.map((submenus , index)=>
            (
              <MenuItem onClick={()=>setmenuComponent(submenus.name)}  className='text-blue text-[15px]  font-inter font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#1e72d9]'/>}> {submenus.name} </MenuItem>

            ))
          }
          
         </SubMenu>
        ))}
       

        {/* <SubMenu className='text-blue text-[16px] font-inter font-semibold' 
         expandIcon={<FaChevronRight className='text-[30px]' />}
        label="Menu 2" icon={ <LuMenuSquare className='text-[26px]'/>}>
          <MenuItem className='text-blue text-[15px]  font-inter font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#1e72d9]'/>}> Menu Item1</MenuItem>
          <MenuItem  className='text-blue text-[14px] font-inter  font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#17bd5c]'/>}> Menu Item2</MenuItem>
          <MenuItem  className='text-blue text-[14px] font-inter  font-semibold' icon={ <LuMenuSquare className='text-[22px] textt-[]'/>}>Menu Item3</MenuItem>
        </SubMenu>

        <SubMenu className='text-blue text-[16px] font-inter font-semibold' 
         expandIcon={<FaChevronRight className='text-[30px]' />}
        label="Menu 3" icon={ <LuMenuSquare className='text-[26px]'/>}>
          <MenuItem className='text-blue text-[15px]  font-inter font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#1e72d9]'/>}> Menu Item1</MenuItem>
          <MenuItem  className='text-blue text-[14px] font-inter  font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#17bd5c]'/>}> Menu Item2</MenuItem>
          <MenuItem  className='text-blue text-[14px] font-inter  font-semibold' icon={ <LuMenuSquare className='text-[22px] textt-[]'/>}>Menu Item3</MenuItem>
        </SubMenu> 

        <SubMenu className='text-blue text-[16px] font-inter font-semibold' 
         expandIcon={<FaChevronRight className='text-[30px]' />}
        label="Menu 4" icon={ <LuMenuSquare className='text-[26px]'/>}>
          <MenuItem className='text-blue text-[15px]  font-inter font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#1e72d9]'/>}> Menu Item1</MenuItem>
          <MenuItem  className='text-blue text-[14px] font-inter  font-semibold' icon={ <LuMenuSquare className='text-[22px] text-[#17bd5c]'/>}> Menu Item2</MenuItem>
          <MenuItem  className='text-blue text-[14px] font-inter  font-semibold' icon={ <LuMenuSquare className='text-[22px] textt-[]'/>}>Menu Item3</MenuItem>
        </SubMenu> */}
      
      
      </Menu>
    </Sidebar>
  </div>
    </div>
  )
}

export default SideBar