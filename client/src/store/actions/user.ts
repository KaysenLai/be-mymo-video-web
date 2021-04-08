import { Action, LoginInfo } from '../../types';

export const REQUEST_USER_LOGIN = 'USER_LOGIN_REQUEST';
export const STORE_USER_LOGIN_ISLOADING = 'STORE_USER_LOGIN_ISLOADING';
export const STORE_USER_LOGIN_SUCCESS = 'STORE_USER_LOGIN_SUCCESS';
export const STORE_USER_LOGIN_FAIL = 'STORE_USER_LOGIN_FAIL';
export const STORE_USER_LOGOUT = 'STORE_USER_LOGOUT';

export const requestUserLogin = (loginInfo: LoginInfo): Action<LoginInfo> => ({
  type: REQUEST_USER_LOGIN,
  payload: loginInfo,
});

export const storeUserLoginIsLoading = (): Action => ({
  type: STORE_USER_LOGIN_ISLOADING,
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
