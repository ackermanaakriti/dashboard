import { FaWpforms } from "react-icons/fa";
import { LuMenuSquare,LuSchool2 } from "react-icons/lu";


export const MenuData =[
  
    {
        menu:'Hospital',
        icon: <LuMenuSquare className='text-[25px] text-[#4a528f]'/>,
        submenu:[
            {
                name:'Kanti Hospital',
            },
            {
                name:'Teaching Hospital',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Bir Hospital',
            },
        ]
    },
    {
        menu:'Colleges',
        icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
        ,
        submenu:[
            {
                name:'Kanti College',
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
        menu:'Hotel',        icon: <LuMenuSquare className='text-[25px] text-[#267bd1]'/>,

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
        menu:'School',        icon: <LuMenuSquare className='text-[25px] text-[#36925c]'/>,

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