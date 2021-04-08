import { Action } from '../../types';
import {
  STORE_USER_LOGIN_FAIL,
  STORE_USER_LOGIN_ISLOADING,
  STORE_USER_LOGIN_SUCCESS,
  STORE_USER_LOGOUT,
} from '../actions/user';
import initialState from '../initialState';

const userLoginState = initialState.userLogin;

export const userLoginReducer = (state = userLoginState, action: Action) => {
  switch (action.type) {
    case STORE_USER_LOGIN_ISLOADING:
      return { ...state, isLoading: true };
    case STORE_USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, errorMessage: '' };
    case STORE_USER_LOGIN_FAIL:
      return { ...state, isLoading: false, errorMessage: action.payload };
    case STORE_USER_LOGOUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
};
