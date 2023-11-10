import axios from 'axios';

export function login(username: string, password: string) {
  return axios.post('/auth/login', { username, password });
}

export function logout() {
  return axios.post('/auth/logout');
}

export function loadProfile(token?: string) {
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
  return axios.get('/auth/profile');
}
