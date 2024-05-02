import axios from 'axios'
import React from 'react'
import { baseUrl } from './Baseurl'
import { useLayouData } from '../Context/MainLayoutContext'

const useDelData = (url) => {
    const {token} = useLayouData()

    const Deldata = async (id) => {
       console.log(id)
       try {
          const response = await axios.post(
             `${baseUrl}${url}${id}`,
             null, // Pass null as the data parameter since it's not needed
             {
                headers: {
                   Authorization: `Bearer ${token}`
                }
             }
          );

          console.log(response);
       } catch(err) {
          console.log(err);
       }
    }

    return { Deldata };
}

export default useDelData;
