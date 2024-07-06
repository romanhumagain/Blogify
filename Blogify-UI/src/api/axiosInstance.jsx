import axios from 'axios';

const createAxiosInstance = (authToken) => {
  
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      if (authToken && authToken.access) {
        requestConfig.headers.Authorization = `Bearer ${authToken.access}`;
      }
      return requestConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return axiosInstance;
};

export default createAxiosInstance;
