import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from './Baseurl';
import { useLayouData } from '../Context/MainLayoutContext';

const useGetData = (url) => {
    const {token}= useLayouData()
    const [data,setData]= useState();
    const [error,setErrror]= useState()

    useEffect(()=>
{
    const fetchData = async ()=>
     {
        try {
            const response =  await axios.get(`${baseUrl}${url}`,
              {headers : { Authorization:`Bearer ${token}` }
             
            })
            setData(response.data.data)
        
           }
         catch (err)
         {
          setErrror(err)
          }
        };

        fetchData();

},[url,token,data]);

  return {data,error}
}

export default useGetData;