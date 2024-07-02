import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from './Baseurl';
import { useLayouData } from '../Context/MainLayoutContext';
import { toast } from 'react-toastify'; // Import the toast library

const usePostData = (url) => {
    const [postDataResponse, setPostData] = useState('');
    const [error, setError] = useState('');
    const { token } = useLayouData();

    const postdata = async (values,name,) => {
        try {
            const response = await axios.post(`${baseUrl}${url}`, values, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPostData(response);
            console.log(response,'to check');
            
            // Show success toast notification
            if(response?.statusText === 'OK')
                {
                    toast.success(`${name} added successfully!`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            
        } catch (error) {
          

            console.log(error)
            // Show error toast notification
            if(error)
            toast.error(`Failed to add  ${name}. Please try again later.`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return { postdata, error, postDataResponse };
};

export default usePostData;
// src/hooks/usePostData.js
// import { useDispatch, useSelector } from 'react-redux';
// import PostDataslice from '../Redux/Slices/PostDataslice';
// import { postData } from '../Redux/Slices/PostDataslice';
// const usePostData = (url) => {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((state) => state.postData);

//   const postdata = (values, name) => {
//     dispatch(postData({ url, values, name }));
//   };

//   return { postdata, data, loading, error };
// };

// export default usePostData;

