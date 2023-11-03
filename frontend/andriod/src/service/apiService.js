// axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://vinayakm.co.in:3000', // Replace with your API base URL
});

// Set the default headers here
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage and set it in the request header
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
export default instance;
