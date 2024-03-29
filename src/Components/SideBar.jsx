import React, { useState } from 'react';
import { useLayouData } from '../Context/MainLayoutContext';
import { MenuData } from '../Data/Menudata';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import './Sidebar.css';
import { UseDispatch, useDispatch } from 'react-redux';
import { addTab } from '../Redux/TopTabSlice';

const SideBar = () => {
    const dispatch = useDispatch()
    const { sidebarToggle,setSidebarToggle } = useLayouData();
    const [activeLink, setActiveLink] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [menuopen, setMenuopen] = useState(false);
   
   

    const handleClick = (name,index) => {
    
         dispatch(addTab({ id:index, menu:name}))
         
        if (activeLink === name) {
            setMenuopen(!menuopen);
        } else {
            setActiveLink(name);
            setMenuopen(true); // Open submenu when clicking on a different menu item
        }
    };

    const handleSubMenuClick = (menu, submenu) => {
        setActiveLink(menu);
        setActiveSubMenu(submenu);
       
       
       

    };
  

    return (
        <div className='sidebar'>
                <div className={`sidenavlist ${sidebarToggle ?'sidebar-open' : 'sidebar-closed' }`}>
                    <nav>
                        <ul>
                            {MenuData.map((menu, index) => (
                                <li key={index}>
                                    <a onClick={() => handleClick(menu.menu,index)} className={activeLink === menu.menu ? 'active' : ''}>
                                        <div className='menuitems-flex'>
                                        <span className='menuicons'>{menu.icon}</span>
                                        <span className='menuname'> {menu.menu}</span>
                                       
                                        </div>
                                        {
                                            activeLink === menu.menu && menuopen ? <span className='chev-icon'><FaChevronDown /></span> : <span className='chev-icon'><FaChevronRight /></span>
                                        }
                                      </a>
                                    {activeLink === menu.menu && menu.submenu && menuopen && (
                                        <ul>
                                            {menu.submenu.map((submenu, subIndex) => (
                                                <li key={subIndex}>
                                                    <a onClick={() => handleSubMenuClick(menu.menu, submenu.name)} className={activeSubMenu === submenu.name ? 'activesubmenu' : ''}>
                                                        <span className='menuicons'>{menu.icon}</span>
                                                        <span className='menuname'>
                                                        {submenu.name}
                                                        </span>
                                                      
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
        </div>
    );
};


export default SideBar;
