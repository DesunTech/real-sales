import axios from "axios";

const Get = async (url) => {
  const data = await axios.get(url);
  if (data?.data) {
    return data?.data;
  }
};

const Post = async (url, meta) => {
  const data = await axios.post(url, meta);
  if (data?.data) {
    return data?.data;
  }
};

const Put = async (url, meta) => {
  const data = await axios.put(url, meta);
  if (data?.data) {
    return data?.data;
  }
};

const Delete = async (url, meta) => {
  const data = await axios.delete(url, meta);
  if (data?.data) {
    return data?.data;
  }
};

export const useApi = () => {
  return { Get, Post, Put, Delete };
};
