import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from './Baseurl'
import { useLayouData } from '../Context/MainLayoutContext'

const useGetById = (url) => {
    const {token}= useLayouData()
    const [dataByid,setdataByid] = useState([])

    const GiveId=async(id)=>
    {
    try 
    {
        const response = await axios.get(`${baseUrl}${url}${id}`,{headers:{Authorization: `Bearer ${token}`}})
       setdataByid(response?.data?.data)
    }
    catch (err)
    {
        console.log(err)
    }
}
  return {GiveId,dataByid}
}

export default useGetById