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
        slug:'branchtable',
        icon: <LuMenuSquare className='text-[28px] text-[#4a528f]'/>,
        submenu:[
            {
                name:'Company',
                slug:'companytable'
            },
            {
                name:'Review Branch',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            
        ]
    },
    {
        menu:'Fiscal Year',
        slug:'fiscalyeartable',
        icon:<LuSchool2 className='text-[28px] text-[#ab243d]' />
        ,
        submenu:[
            {
                name:'Add Fiscal Year',
                slug:'fiscalform',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            
        ]
    },
    {
        menu:'Currency',  
        slug:'currencytable'  ,  
          icon: <LuMenuSquare className='text-[28px] text-[#267bd1]'/>,

        submenu:[
           
        ]
    },
    {
        menu:'Chart of Account', 
        slug:'chartofacctable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'tree', 
        slug:'treeview',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Account Group', 
        slug:'Accgrptable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Voucher Type', 
        slug:'vouchertype',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Voucher ', 
        slug:'voucher',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Employee ', 
        slug:'employeetable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Module ', 
        slug:'moduletable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Department ', 
        slug:'departmenttable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Customer ', 
        slug:'customertable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },{
        menu:'Vendor ', 
        slug:'vendorTable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Bank ', 
        slug:'banktable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
    {
        menu:'Vocuher Sequence ', 
        slug:'voucherseqtable',   
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[]
    },
]