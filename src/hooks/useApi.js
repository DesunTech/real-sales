import axiosInstance from "../utils/axiosInstance";

/**
 * Makes a GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @returns {Promise<any>} - The data returned from the API.
 */
const Get = async (url) => {
  try {
    const data = await axiosInstance.get(url);
    if (data?.data) {
      return data?.data;
    }
  } catch (error) {
    console.log(error, "error")
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
      return data?.data;
    }
  } catch (error) {
    console.log(error, "error")
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
      return data?.data;
    }
  } catch (error) {
    console.log(error, "error")
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
      return data?.data;
    }
  } catch (error) {
    console.log(error, "error")
  }
};

/**
 * Custom hook to use API methods.
 * @returns {Object} - An object containing the API methods: Get, Post, Put, Delete.
 */
export const useApi = () => {
  return { Get, Post, Put, Delete };
};
