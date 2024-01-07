import axios from 'axios';
import { useEffect, useState } from 'react';
import resolve from './resolve';
import { ResolvedReq } from './types';
import { getData } from './getData';

// So cookies can be sent automatically with requests
axios.defaults.withCredentials = true;

/**
 * A custom hook which makes a GET request to the server when given a url and returns the response data after it is resolved by the {@link resolve} function.
 * @param url - a string representing the url to make the request to. The format should be 'router/endpoint'
 */
const useData = (url: string) => {
  const [data, setData] = useState<ResolvedReq | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(url);
      setData(res);
    };

    fetchData();
  }, [url]);

  return data;
};
export default useData;
