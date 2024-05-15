import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Dashboard from '../Components/Dashboard'
import SideBar from '../Components/SideBar'
import { MainLayoutProvider } from '../Context/MainLayoutContext'

const MainLayout = () => {
  return (
    <>
   
    <Header/>
    <div className='flex '>
        <SideBar/>
        <Dashboard/>
    </div>
    <Footer/>
   
    
    </>
  )
}

export default MainLayout