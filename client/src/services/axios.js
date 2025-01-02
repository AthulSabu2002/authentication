import axios from 'axios';

axios.defaults.withCredentials = true; // Include cookies in all requests

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
