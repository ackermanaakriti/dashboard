import React from 'react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
   <>
   <div className='footer  bg-SecondaryColor'>
    <div className='flex justify-between'>
      <div className='flex items-center py-[10px] px-[30px] firstdiv gap-[15px] bg-PrimaryColor'>
        <p className='text-white text-[16px] text-center font-inter'>Powered By Onviro Tech</p>
        <figure className='h-[35px] w-[35px] rounded-[50%] overflow-hidden '>
         <img className='h-[100%] w-[100%] object-cover' src='./images/user.jpg' alt=''/>
        </figure>
      </div>
      <div className='bg-PrimaryColor secondiv py-[10px] px-[30px]  flex gap-[40px] items-center'>
       <div className='flex gap-[10px] items-center '>
       <span className='text-white text-[20px]'><FaPhone/></span>
      <p className='text-white text-[16px] text-center font-inter'>9876525282</p>
       </div>
       <div  className='flex gap-[10px] items-center '>
       <span className='text-white text-[20px]'><FaEnvelope/></span>
      <p className='text-white text-[16px] text-center font-inter'>onviro@gmail.com</p>
       </div>
      </div>
      
    </div>
   </div>
   </>
  )
}

export default Footer