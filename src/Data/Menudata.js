import { FaWpforms } from "react-icons/fa";
import { LuMenuSquare,LuSchool2 } from "react-icons/lu";
import { MdDashboardCustomize } from "react-icons/md";



export const MenuData =[
    {
        menu:'Dashboard',
        slug:'/',
        icon: <MdDashboardCustomize className='text-[28px] text-[#049268ec]'/>,
        submenu: []

    },
  
    {
        menu:'Company Settings',
        slug:'companusetting',
        icon: <LuMenuSquare className='text-[28px] text-[#4a528f]'/>,
        submenu:[
            {
                name:'Company',
                slug:'company'
            },
            {
                name:' Branch',
                slug:'branch',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:' Module',
                slug:'module',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:' Department',
                slug:'department',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            
        ]
    },
    {
        menu:'Transaction', 
        slug:'transaction',
        icon: <LuMenuSquare className='text-[28px] text-[#36925c]'/>,
        submenu:[
            {
                name:'Voucher ',
                slug:'voucher',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
        ]
    },
    {
        menu:'Account Settings',
        slug:'fiscalyear',
        icon:<LuSchool2 className='text-[28px] text-[#ab243d]' />
        ,
        submenu:[
            {
                name:'Chart of Accounts',
                slug:'chartofaccount/listview',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Voucher Types ',
                slug:'vouchertype',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Voucher Sequence ',
                slug:'vouchersequence',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            
        ]
    },
    {
        menu:'Reports',
        slug:'reports',
        icon: <LuMenuSquare className='text-[28px] text-[#267bd1]'/>,
        submenu:[
            {name:'Balance Sheet',
            slug:'balancesheet'

            }
        ]
    },
   
    {
        menu:'Other Settings',  
        slug:'currencytable'  ,  
          icon: <LuMenuSquare className='text-[28px] text-[#267bd1]'/>,

          submenu:[
            {
                name:'Bank',
                slug:'bank',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Debtors ',
                slug:'debtors',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Credtitors ',
                slug:'creditors',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            {
                name:'Employee ',
                slug:'employee',
                icon:<LuSchool2 className='text-[25px] text-[#ab243d]' />
            },
            
        ]
    },
    
   
]