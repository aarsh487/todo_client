import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

const axiosInstance = axios.create({
  baseURL: isProduction
    ? 'https://todo-client-byqj.onrender.com/api'
    : 'http://localhost:3000/api',
  withCredentials: true,
});

export default axiosInstance;

