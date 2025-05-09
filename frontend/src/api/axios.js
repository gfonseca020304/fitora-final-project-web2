import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('token');


  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;