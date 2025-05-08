import axiosInstance from "../utils/axiosInstance";

const Get = async (url) => {
  const data = await axiosInstance.get(url);
  if (data?.data) {
    return data?.data;
  }
};

const Post = async (url, meta) => {
  const data = await axiosInstance.post(url, meta);
  if (data?.data) {
    return data?.data;
  }
};

const Put = async (url, meta) => {
  const data = await axiosInstance.put(url, meta);
  if (data?.data) {
    return data?.data;
  }
};

const Delete = async (url, meta) => {
  const data = await axiosInstance.delete(url, meta);
  if (data?.data) {
    return data?.data;
  }
};

export const useApi = () => {
  return { Get, Post, Put, Delete };
};
