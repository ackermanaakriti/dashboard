import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./Baseurl";
import { useLayouData } from '../Context/MainLayoutContext';

function useGetData(fetchurl, deleteurl) {
  const { token } = useLayouData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}${fetchurl}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response?.data?.data);
      setLoading(false);
      console.log(response)
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const Deldata = async (id) => {
    console.log(id);
    try {
    const response =  await axios.post(
        `${baseUrl}${deleteurl}${id}`,
        null, // Pass null as the data parameter since it's not needed
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Update the local state to remove the deleted item
      setData((prevData) => prevData.filter(item => item.id !== id));
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchurl,deleteurl,]);

  return { data, error, fetchData, loading, Deldata };
}

export default useGetData;
