import axios from 'axios';
import React, { useState } from 'react'
import { baseUrl } from './Baseurl';
import { useLayouData } from '../Context/MainLayoutContext';

const  useUpdateData = (url) => {
    const [updatedData,setUpdatedData]= useState();
    const [updateError,setUpdateError] = useState()
    const {token}= useLayouData()

    const updateData = async (values)=>
    {
        try 
        {
            const response = await axios.post(`${baseUrl}${url}`,values,{headers : {Authorization:`Bearer ${token}`} })
            console.log(response)
        }
        catch (err)
        {
            console.log(err)
            setUpdateError(err)
        }
    }
  return {updateData}
}

export default  useUpdateData