import { Action, loginInfo, todoList } from '../../types';
import * as actions from './actionTypes';

export const REQUEST_USER_LOGIN = 'USER_LOGIN_REQUEST';
export const STORE_USER_LOGIN_SUCCESS = 'STORE_USER_LOGIN_SUCCESS';
export const STORE_USER_LOGIN_FAIL = 'STORE_USER_LOGIN_FAIL';
export const STORE_USER_LOGOUT = 'STORE_USER_LOGOUT';

export const requestUserLogin = (loginInfo: loginInfo): Action<loginInfo> => ({
  type: REQUEST_USER_LOGIN,
  payload: loginInfo,
});

export const storeUserLoginSuccess = (userInfo: any): Action<any> => ({
  type: STORE_USER_LOGIN_SUCCESS,
  payload: userInfo,
});

export const storeUserLoginFail = (errorMsg: string): Action<string> => ({
  type: STORE_USER_LOGIN_FAIL,
  payload: errorMsg,
});

export const storeUserLogout = (): Action => ({
  type: STORE_USER_LOGOUT,
});
