import React,{useState,useEffect} from 'react'
import { useLayouData } from '../Context/MainLayoutContext'
import CollegeMenu from './CollegeMenu'
import Schoolmenu from './Schoolmenu'
const MenuComponetMap = {
  
  'Colleges': <CollegeMenu/>,
  'School': <Schoolmenu/>
  
}

const HomeMenu = () => {
  const[SelectedCompo,setSlectedComponent] = useState(null)

  const{menuComponent,setmenuComponent}= useLayouData()
  console.log(menuComponent)

  useEffect(() => {
    setSlectedComponent(MenuComponetMap[menuComponent]);
  }, [menuComponent]);
 
   
  
  return (
   <>
   {SelectedCompo}
   </>
  )
}

export default HomeMenu