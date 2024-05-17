import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "./Baseurl";
import { useLayouData } from '../Context/MainLayoutContext';

function useGetData(initialUrl) {
  const { token } = useLayouData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(initialUrl);

  // Memoize the URL to avoid unnecessary re-fetching
  const memoizedUrl = useMemo(() => url, [url]);

  // Memoize the fetchData function to avoid re-creating it on every render
  const fetchData = useCallback(async () => {
    if (!memoizedUrl) return; // If URL is null or empty, do nothing
    try {
      // Set loading state to true
      setLoading(true);
      const response = await axios.get(`${baseUrl}${memoizedUrl}`, {
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
  }, [memoizedUrl, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, fetchData, loading, setUrl }; // Return fetchData along with data, error, loading, and setUrl
}

export default useGetData;
