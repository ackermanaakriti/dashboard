import { useState } from "react";
import axios from "axios";
import { baseUrl } from "./Baseurl";
import { useLayouData } from '../Context/MainLayoutContext';

function useDelData(deleteurl) {
  const { token } = useLayouData();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Initial state should be false
  const [deleteResponse, setDeleteResponse] = useState(null); // Ensure initial state is null

  const Deldata = async (id) => {
    setLoading(true); // Start loading when the request is initiated
    setError(null); // Reset error before making a new request
    try {
      const response = await axios.post(
        `${baseUrl}${deleteurl}${id}`,
        null, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDeleteResponse(response); // Set the response in state
      console.log(response);
    } catch (err) {
      setError(err); // Set the error in state
      console.log(err);
    } finally {
      setLoading(false); // Stop loading when the request is completed
    }
  };

  return { error, loading, Deldata, deleteResponse };
}

export default useDelData;
