import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3003/api',
  withCredentials: true,
});

export const registerRequest = (user) => api.post('/register', user, { withCredentials: true });

export const loginRequest = (user) => api.post('/login', user, { withCredentials: true });

export const verifyTokenRequest = () =>  api.get('/verify')