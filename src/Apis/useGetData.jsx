import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./Baseurl";
import { useLayouData } from '../Context/MainLayoutContext';

function useGetData(url) {
  const { token } = useLayouData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Set loading state to true
      setLoading(true);
      const response = await axios.get(`${baseUrl}${url}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update data and set loading state to false
      setData(response?.data);
      setLoading(false);
    } catch (err) {
      // Handle errors
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return { data, error, fetchData }; // Return fetchData along with data and error
}

export default useGetData;
