import axios from "axios";

const baseURL = (typeof window !== 'undefined' ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL) || 'http://localhost:3003/api'

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const registerRequest = (user) => api.post('/register', user, { withCredentials: true });

export const loginRequest = (user) => api.post('/login', user, { withCredentials: true });

export const verifyTokenRequest = () =>  api.get('/verify')
