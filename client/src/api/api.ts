import baseUrl from '../config/apis';

import axios from 'axios';

const authAxios = axios.create({ baseURL: baseUrl });

authAxios.interceptors.request.use((req) => {
  if (sessionStorage.getItem('user')) {
    const token = JSON.parse(sessionStorage.getItem('user') as string).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export { authAxios };

export const apiUserLogin = (): string => `${baseUrl}/user/login`;
export const apiUserGoogleLogin = (): string => `${baseUrl}/user/googlelogin`;
export const apiUserSignUp = (): string => `${baseUrl}/user/signup`;
