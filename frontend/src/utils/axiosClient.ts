import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/themeConfigSlice';

const cookies = new Cookies();

const axiosClient = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
   const token = cookies.get('auth_token');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

axiosClient.interceptors.response.use(
   (response) => {
      // const dispatch = useDispatch();
      // if (response.data.user) {
      //    dispatch(setUser(response.data.user));
      // }
      return response;
   },
   (error) => {
      if (error.response) {
         // The request was made and the server responded with a status code that falls out of the range of 2xx
         console.error('Response Error:', error.response.data);
         console.error('Response Code:', error.response.status);

         if (error.response.status === 401) {
            cookies.remove('auth_token');
            window.location.href = '/auth/signin';
         }
      } else if (error.request) {
         // The request was made but no response was received
         console.error('Request Error:', error.request);
      } else {
         // Something happened in setting up the request that triggered an Error
         console.error('Error:', error.message);
      }
      return Promise.reject(error);
   }
);

export default axiosClient;
