import axios from "axios";

const API = 'http://localhost:3003/api'

export const registerRequest = user => axios.post(`${API}/register`, user)