import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';


const useAxios = (url: any, data: any, method: Method | undefined = 'GET') => {
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080/api/v1',
    data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };

  useEffect(() => {
    axios(url, config)
      .then(res => setResponse(res))
      .catch(err => setError(err))
      .finally(() => setLoaded(true))
  }, []);

  return { response, error, loaded };
};


export default useAxios;
