import axios from 'axios';
import React, { useState } from 'react'
import { baseUrl } from './Baseurl';
import { useLayouData } from '../Context/MainLayoutContext';
import { toast } from 'react-toastify'; // Import the toast library
import { useNavigate } from 'react-router';
const  useUpdateData = (url) => {
    const [updatedData,setUpdatedData]= useState();
    const [updateError,setUpdateError] = useState()
    const {token}= useLayouData()
    const navigate = useNavigate()

    const updateData = async (values)=>
    {
        try 
        {
            const response = await axios.post(`${baseUrl}${url}`,values,{headers : {Authorization:`Bearer ${token}`} })
            console.log(response)
            if(response.statusText === 'OK')
                {
                    toast.success(`updated Successfully !`)
                    
                }
        }
        catch (err)
        {
            console.log(err)
            setUpdateError(err)
            toast.error(`Something went wrong while updating `)
        }
    }
  return {updateData}
}

export default  useUpdateData