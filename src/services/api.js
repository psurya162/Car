import axios from 'axios';

// Create an axios instance with the base URL and default headers
const api = axios.create({
  baseURL: 'https://your-api-base-url.com/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Replace with AsyncStorage if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
