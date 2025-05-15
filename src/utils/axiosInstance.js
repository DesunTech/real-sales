// api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
  if (typeof window !== 'undefined') { // Check if in browser
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set token if available
    }
    config.headers['Content-Type'] = 'application/json'; // Set Content-Type for all requests
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
