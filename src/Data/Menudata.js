import { FaWpforms } from "react-icons/fa";
import { LuMenuSquare,LuSchool2 } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";



export const MenuData =[
    {
        menu:'Dashboard',
        icon: <MdDashboardCustomize className='text-[28px] text-[#049268ec]'/>,
        submenu: []

    },
  
    {
        menu:'Branch',
        slug:'branch',
        icon: <LuMenuSquare className='text-[28px] text-[#4a528f]'/>,
        submenu:[
            {
                name:'Add Branch',
                slug:'addbranch'
            },
            {
                name:'Review Branch',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            
        ]
    },
    {
        menu:'Fiscal Year',
        slug:'fiscalyear',
        icon:<LuSchool2 className='text-[28px] text-[#ab243d]' />
        ,
        submenu:[
            {
                name:'Add Fiscal Year',
                slug:'fiscalform',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Teaching College',
                icon: <LuMenuSquare className='text-[25px] text-[#4a528f]'/>,
            },
            {
                name:'Bir College',
            },
        ]
    },
    {
        menu:'Hotel',        icon: <LuMenuSquare className='text-[28px] text-[#267bd1]'/>,

        submenu:[
            {
                name:'Yak & Yeti Hotel',
            },
            {
                name:'Imperial hotel',
            },
            {
                name:'Bir Hotel',
            },
        ]
    },
    {
        menu:'Settings',        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,

        submenu:[
            {
                name:'Yak & Yeti School',
                icon: <LuMenuSquare className='text-[25px] text-[#36925c]'/>
                
            },
            {
                name:'Imperial School',
                icon: <LuMenuSquare className='text-[25px] text-[#267bd1]'/>
            },
            {
                name:'Bir School',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
        ]
    }
]