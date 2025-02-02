import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Optionally add a request interceptor to attach auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
