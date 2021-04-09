import axios, { AxiosResponse } from 'axios';
import { apiUserGoogleLogin, apiUserLogin } from '../../../api/api';
import { GoogleLoginInfo, LoginInfo } from '../../../types';

export const axiosUserLogin = async (loginInfo: LoginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserLogin(), loginInfo);
};

export const axiosUserGoogleLogin = async (googleLoginInfo: GoogleLoginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserGoogleLogin(), googleLoginInfo);
};
