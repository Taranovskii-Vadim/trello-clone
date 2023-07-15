import axios from 'axios';

const init = localStorage.getItem('token');

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: init ? { Authorization: init } : undefined,
});
