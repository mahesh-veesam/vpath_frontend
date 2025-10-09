import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://vpath.onrender.com/" ,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});