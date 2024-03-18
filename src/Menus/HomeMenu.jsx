import React,{useState,useEffect} from 'react'
import { useLayouData } from '../Context/MainLayoutContext'
import CollegeMenu from './CollegeMenu'
import Schoolmenu from './Schoolmenu'


const MenuComponetMap = {
  
  'Colleges': <CollegeMenu/>,
  'School': <Schoolmenu/>,
  'tableform': <Schoolmenu/>,
  'gotoTable':<CollegeMenu/>
  
}

const HomeMenu = () => {
  const[SelectedCompo,setSlectedComponent,] = useState(null)

  const{menuComponent,setmenuComponent,gotoComp,setGotoComp,hanleInquiry,setHandleInquiry}= useLayouData()
  
 

  useEffect(() => {
    setSlectedComponent(MenuComponetMap[menuComponent]);
  }, [menuComponent]);
 
   
  
  return (
   <>
    {hanleInquiry && (<div className='h-[50px]  w-[50%] inquirydiv'>
         <form>
          <div className='grid grid-cols-2 gap-2'>
            <div className=''>
            <label>Full Name:</label>
            <input/>
            </div>
            <div>
            <label>Address:</label>
            <input/>
            </div>
          </div>
          <div>
            <label>Email:</label>
            <input/>
          </div>
          <div>
            <label>Message:</label>
            <textarea></textarea>
          </div>
          <button>Submit</button>

         </form>
    </div>)}
    <div className='relative'>
    {SelectedCompo}
    </div>
  
   </>
  )
}

export default HomeMenu