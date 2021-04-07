import axios, { AxiosResponse } from 'axios';
import { apiUserLogin } from '../../../api/api';
import { loginInfo } from '../../../types';

export const axiosUserLogin = async (loginInfo: loginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserLogin(), loginInfo);
};
