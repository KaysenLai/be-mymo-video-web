import axios, { AxiosResponse } from 'axios';
import { apiUserLogin } from '../../../api/api';
import { LoginInfo } from '../../../types';

export const axiosUserLogin = async (loginInfo: LoginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserLogin(), loginInfo);
};
