import React from 'react'
import { useNavigate } from 'react-router'


const CancelButton = ({link}) => {
    const navigate = useNavigate()
  return (
   <>
     <button
                  onClick={() => navigate(link)}
                  className=" border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter"
                  type="button"
                >
                  Cancel
                </button>

   </>
  )
}

export default CancelButton
