import axios from "axios";
import API_URL from "../constants";

//Check if the user is authenticated
const isAuth = localStorage.hasOwnProperty('user') && JSON.parse(localStorage.getItem('user')).token !== null;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: isAuth ? { 'x-access-tokens': JSON.parse(localStorage.getItem('user')).token || null } : null
});

export default axiosInstance;