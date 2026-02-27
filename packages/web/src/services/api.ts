import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
export const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });
api.interceptors.response.use((r) => r, (error) => { console.error('[API Error]', error.response?.data || error.message); return Promise.reject(error); });
