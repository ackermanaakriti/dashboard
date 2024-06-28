import React from 'react'
import useDelData from '../Apis/useDelData'
import { useLayouData } from '../Context/MainLayoutContext'
import useGetData from '../Apis/useGetData'


const DeletePopup = ({DeleteId,DatatobeDeleted,Deldata}) => {
  
   
   
    const { DeletePopup,setDeletePopupShow} = useLayouData()
  
    const handleAbort=()=>
        {
            setDeletePopupShow(false)
        }
        const handleDel =  () => {
            
           Deldata(DeleteId)
           
            setDeletePopupShow(false); 

           
        }
        

    return (
        <>
            <div className='overlay fixed inset-0 w-full h-full bg-[rgba(36,35,35,0.12)] ' style={{ zIndex: 9999 }}>
                <div className=' flex justify-center items-center h-full '>
                    <div className=' h-[180px] w-[20%] bg-bgclr p-[20px] rounded-[10px]'>
                       
                        <div className='py-[20px]  '>
                            <p className='text-center font-inter text-[20px]'>Do you want really want to delete
                          <span className='font-[700] font-inter text-PrimaryColor'> {DatatobeDeleted}</span>?</p>
                        </div>
                        <div className='flex justify-center gap-[20px] items-center pt-[10px]'>
                            <button onClick={handleAbort} className='bg-[#bfbfbd] px-[12px] rounded-[7px] text-black py-[4px]  font-inter'>Cancel</button>
                            <button onClick={handleDel} className='bg-redclr px-[12px] py-[4px] font-inter rounded-[7px] text-white'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopup