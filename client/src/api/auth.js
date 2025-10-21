import axios from "axios";
import Cookies from "js-cookie";

const baseURL = (typeof window !== 'undefined' ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL) || 'http://localhost:3003'

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000, // 10 segundos de timeout
});

export const registerRequest = (user) => api.post('/api/register', user, { withCredentials: true });

export const loginRequest = (user) => api.post('/api/login', user, { withCredentials: true });

export const verifyTokenRequest = () => {
  const token = localStorage.getItem('token') || Cookies.get('token');
  return api.get('/api/verify', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
