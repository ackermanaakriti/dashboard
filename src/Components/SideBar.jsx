import React, { useState } from 'react';
import { useLayouData } from '../Context/MainLayoutContext';
import { MenuData } from '../Data/Menudata';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import './Sidebar.css';
import { UseDispatch, useDispatch } from 'react-redux';
import { addTab } from '../Redux/TopTabSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const SideBar = () => {
    const dispatch = useDispatch()
    const { sidebarToggle,formDirty,setFormDirty } = useLayouData();
    const [activeLink, setActiveLink] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [menuopen, setMenuopen] = useState(false);
    const navigate = useNavigate()
    const [pageLeavepopUp,setPageLeavepopUp] = useState(false)
    const [url,setUrl]= useState('')
   
console.log('from sidebar',formDirty)
console.log(pageLeavepopUp)

    const handleClick = (name,index) => {
        console.log(name)
        console.log(activeLink)
    
        if(name=== '/')
            {
                navigate('/')
            }
         
        if (activeLink === name) {
            setMenuopen(!menuopen);
        } else {
            setActiveLink(name);
            setMenuopen(true); // Open submenu when clicking on a different menu item
        }
    };

    const handleLeavePage=()=>
        {
            console.log('lets leave')
            navigate(url)
            setPageLeavepopUp(false)
            setFormDirty(false)
        }
    const handleSubMenuClick = ( event,submenu,index) => {
        // setActiveLink(menu);
       
        if(formDirty)
            {
                event.preventDefault();
                setPageLeavepopUp(true)
               
               const fullUrl =event.currentTarget.href;
               const urlObject = new URL(fullUrl);
               const pathname = urlObject.pathname;
               console.log(pathname)
               setUrl(pathname)
              

               
            }
            else 
            {
                dispatch(addTab({ id:index, menu:submenu}))
                setActiveSubMenu(submenu);
            }
           
       
    
       
    };
  

    return (
        <>
        <div className='sidebar'>
                <div className={`sidenavlist ${sidebarToggle ?'sidebar-open' : 'sidebar-closed' }`}>
                    <nav>
                        <ul>
                            {MenuData.map((menu, index) => (
                                <li key={index}>
                                    <a onClick={() => handleClick(menu.slug,index)} className={activeLink === menu.slug ? 'active' : ''}>
                                        <div className='menuitems-flex'>
                                        <span className='menuicons'>{menu.icon}</span>
                                        <span className='menuname cursor-pointer'> {menu.menu}</span>
                                       
                                        </div>
                                        {
                                           menu.submenu.length > 0 ? ( activeLink === menu.slug &&  menuopen ? <span className='chev-icon'><FaChevronDown /></span> : <span className='chev-icon'><FaChevronRight /></span>):''
                                        }
                                      </a>
                                    {activeLink === menu.slug && menu.submenu.length > 0 && menuopen && (
                                        <ul style={{zIndex:'99999'}}>
                                            {menu.submenu.map((submenu, subIndex) => (
                                                <li key={subIndex}>
                                                    <NavLink to={`/${submenu?.slug}`} onClick={(event) => handleSubMenuClick(event, submenu.slug ,index)} className={activeSubMenu === submenu.name ? 'activesubmenu' : ''}>
                                                        <span className='menuicons'>{menu.icon}</span>
                                                        <span className='menuname'>
                                                        {submenu.name}
                                                        </span>
                                                      
                                                    </NavLink>
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
        {pageLeavepopUp ?  <div className='overlay fixed inset-0 w-full h-full bg-[rgba(36,35,35,0.12)] ' style={{ zIndex: 9999 }}>
                <div className=' flex justify-center items-center h-full '>
                    <div className=' h-[200px] w-[30%] bg-bgclr p-[20px] rounded-[10px]'>
                       
                        <div className='py-[20px]  '>
                            <p className='text-center font-inter text-[20px]'>Are you sure you want to leave this page?</p>
                            <p className='text-center font-inter text-PrimaryColor pt-[8px]  text-[18px]'>Changes you made will not be saved.</p>
                        
                        </div>
                        <div className='flex justify-center gap-[20px] items-center pt-[8px]'>
                            <button onClick={()=>setPageLeavepopUp(false)} className='bg-[#bfbfbd] px-[12px] rounded-[7px] text-black py-[4px]  font-inter'>Cancel</button>
                            <button onClick={handleLeavePage} className='bg-redclr px-[12px] py-[4px] font-inter rounded-[7px] text-white'>Leave</button>
                        </div>
                    </div>
                </div>
            </div> : '' }
        </>
    );
};


export default SideBar;
