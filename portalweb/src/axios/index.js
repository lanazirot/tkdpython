import axios from "axios";
import API_URL from "../constants";

//Check if the user is authenticated
const isAuth = localStorage.hasOwnProperty('user') && JSON.parse(localStorage.getItem('user')).token !== null;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: isAuth ? { 'x-access-tokens': JSON.parse(localStorage.getItem('user')).token || null } : null
});

// Check if request had an error
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 400 || error.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;