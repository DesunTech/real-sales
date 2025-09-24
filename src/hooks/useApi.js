import axios from 'axios';
import { showToast } from "../utils/toastConfig";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Do not set default Content-Type here!
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Only set Content-Type to application/json if data is not FormData
    if (
      config.data &&
      typeof window.FormData !== 'undefined' &&
      config.data instanceof window.FormData
    ) {
      // Let axios set the correct Content-Type for FormData
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * Makes a GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise<any>} - The data returned from the API.
 */
const Get = async (url) => {
  try {
    const data = await axiosInstance.get(url);
    if (data?.data) {
      // Only show success toast if there's a message
      if (data?.data?.message) {
        showToast.success(data?.data?.message);
      }
      return data?.data;
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.detail || error?.message || 'Request failed';
    showToast.error(errorMessage);
    throw error; // Re-throw to allow calling code to handle
  }
};

/**
 * Makes a POST request to the specified URL with the provided data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} meta - The data to be sent in the request body.
 * @returns {Promise<any>} - The data returned from the API.
 */
const Post = async (url, meta) => {
  try {
    const data = await axiosInstance.post(url, meta);
    if (data?.data) {
      // Only show success toast if there's a message
      if (data?.data?.message) {
        showToast.success(data?.data?.message);
      }
      return data?.data;
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.detail || error?.message || 'Request failed';
    showToast.error(errorMessage);
    throw error; // Re-throw to allow calling code to handle
  }
};

/**
 * Makes a PUT request to the specified URL with the provided data.
 * @param {string} url - The URL to send the PUT request to.
 * @param {object} meta - The data to be updated in the request body.
 * @returns {Promise<any>} - The data returned from the API.
 */
const Put = async (url, meta) => {
  try {
    const data = await axiosInstance.put(url, meta);
    if (data?.data) {
      // Only show success toast if there's a message
      if (data?.data?.message) {
        showToast.success(data?.data?.message);
      }
      return data?.data;
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.detail || error?.message || 'Request failed';
    showToast.error(errorMessage);
    throw error; // Re-throw to allow calling code to handle
  }
};

/**
 * Makes a DELETE request to the specified URL.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {object} meta - Optional data to be sent with the request.
 * @returns {Promise<any>} - The data returned from the API.
 */
const Delete = async (url, meta) => {
  try {
    const data = await axiosInstance.delete(url, meta);
    if (data?.data) {
      // Only show success toast if there's a message
      if (data?.data?.message) {
        showToast.success(data?.data?.message);
      }
      return data?.data;
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.detail || error?.message || 'Request failed';
    showToast.error(errorMessage);
    throw error; // Re-throw to allow calling code to handle
  }
};

/**
 * Custom hook to use API methods.
 * @returns {Object} - An object containing the API methods: Get, Post, Put, Delete.
 */
export const useApi = () => {
  return { Get, Post, Put, Delete };
};
