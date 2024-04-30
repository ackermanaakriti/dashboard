import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from './Baseurl';
import { useLayouData } from '../Context/MainLayoutContext';

const usePostData = (url) => {
    const [postData,setPostData]= useState(); 
    const [postError,setPostError]= useState();
    const {token }= useLayouData()

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
            
          setPostError(err)
          console.log(err)
        }
    }


  return  {postdata,postError}
}

export default usePostData;