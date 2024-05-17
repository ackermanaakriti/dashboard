import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from './Baseurl';
import { useLayouData } from '../Context/MainLayoutContext';

const usePostData = (url) => {
    const [postData,setPostData]= useState(); 
    const [postError,setPostError]= useState([]);
    const [error,setError]= useState('')
    const {token }= useLayouData()
   
    const addErrorMessagesToState = (error) => {
        console.log(error)
        const msg =(Object.values(error).flat());
        console.log(msg)
        setPostError(msg)
      };
      useEffect(() => {
        addErrorMessagesToState(error);
      }, [error]);
      

    const postdata = async (values)=>
    {
        try 
        {
            const response = await axios.post(`${baseUrl}${url}`,values,
        {
            headers : { Authorization:`Bearer ${token}`},  
        })
            setPostData(response)
            console.log(response)
        }
        catch (err)
        {
            
            setError(err.response?.data.errors);
            console.log(err.response?.data.errors);

            
          
          
        }
        console.log(error)
        console.log(postError)
    }


  return  {postdata,postError}
}

export default usePostData;