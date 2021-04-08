import baseUrl from '../config/apis';

import axios from 'axios';

const authAxios = axios.create({ baseURL: baseUrl });

authAxios.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    const token = JSON.parse(<string>localStorage.getItem('user')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const apiUserLogin = (): string => `${baseUrl}/user/login`;
export const apiUserGoogleLogin = (): string => `${baseUrl}/user/googlelogin`;
export const apiUserSignUp = (): string => `${baseUrl}/user/signup`;
