import axiosInstance from "../utils/axiosInstance";

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

export const useApi = () => {
  return { Get, Post, Put, Delete };
};
