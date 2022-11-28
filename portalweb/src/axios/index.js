import axios from "axios";
import API_URL from "../constants";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'x-access-tokens': JSON.parse(localStorage.getItem('user')).token
  }
});

export default axiosInstance;