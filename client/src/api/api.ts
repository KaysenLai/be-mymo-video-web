import baseUrl from '../config/apis';

import axios from 'axios';

const authAxios = axios.create({ baseURL: baseUrl });

authAxios.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const token = JSON.parse(<string>localStorage.getItem('profile')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const apiUserLogin = (): string => `${baseUrl}/user/login`;

export const apiUserSignUp = (): string => `${baseUrl}/user/signup`;
