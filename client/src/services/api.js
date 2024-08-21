import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN', // The cookie name where the token is stored
  xsrfHeaderName: 'X-CSRF-Token', // Header name for the CSRF Token
});

export default api;
