import React, { useState } from 'react';
import { Sidebar,Menu, SubMenu,MenuItem } from 'react-pro-sidebar';
import { MdDashboard } from 'react-icons/md';
import { FaChevronRight } from 'react-icons/fa';
import { LuMenuSquare } from 'react-icons/lu';
import { useLayouData } from '../Context/MainLayoutContext';
import { MenuData } from '../Data/Menudata';

const SideBar = () => {
    const { menuClose, menuOpen, collapsed, setCollapsed, menuComponent, setmenuComponent } = useLayouData();
    const [openSubMenu, setOpenSubMenu] = useState(null); // State to keep track of the currently open submenu

    const handleOpenSubMenu = (menu) => {
        setOpenSubMenu(openSubMenu === menu ? null : menu); // Toggle open/close of submenu
    };

    return (
        <div className={`sidebar ${menuClose ? menuOpen: ''}`} >
            <div style={{ display: 'flex', height: '100%' }}>
                <Sidebar>
                    <Menu>
                        <MenuItem className='text-blue text-[16px] font-inter font-semibold' icon={<MdDashboard className='text-[25px]' />}>Dashboard</MenuItem>
                        {MenuData?.map((menus, index) => (
                            <SubMenu
                            onClick={()=>setmenuComponent(menus.menu)} 
                                key={index}
                                className='text-blue text-[16px] font-inter font-semibold'
                                expandIcon={<FaChevronRight className='text-[30px]' />}
                                label={menus.menu}
                                icon={menus.icon}
                                active={openSubMenu ===menus.menu}
                                open={openSubMenu === menus.menu} // Check if this submenu is open
                                onOpenChange={() => handleOpenSubMenu(menus.menu)} // Handle submenu click
                            >
                                {menus?.submenu?.map((submenus, index) => (
                                    <MenuItem active
                                        key={index}
                                        onClick={() => setmenuComponent(submenus.name)}
                                        className='text-blue text-[16px] font-inter font-semibold'
                                        icon={<LuMenuSquare className='text-[22px] text-[#1e72d9]' />}
                                    >
                                        {submenus.name}
                                    </MenuItem>
                                ))}
                            </SubMenu>
                        ))}
                    </Menu>
                </Sidebar>
            </div>
        </div>
    );
};

export default SideBar;
