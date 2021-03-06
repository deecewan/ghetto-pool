import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://ghettopool.party/api"

axios.interceptors.request.use((config) => {
    return { ...config, withCredentials: true };
}, Promise.reject);
