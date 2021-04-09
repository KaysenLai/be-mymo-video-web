import { Action } from '../../types';
import {
  STORE_USER_LOGIN_FAIL,
  STORE_USER_LOGIN_ISLOADING,
  STORE_USER_LOGIN_SUCCESS,
  STORE_USER_LOGOUT,
} from '../actions/user';
import initialState from '../initialState';
import jwt from 'jsonwebtoken';

const getLocalUser = () => {
  const userLocal = JSON.parse(<string>localStorage.getItem('user'));
  if (!userLocal) return null;

  const secret = process.env.REACT_APP_JWT_SECRET;
  const token = userLocal.token;

  try {
    const isGoogleToken = token.length > 500;
    let decoded;
    if (isGoogleToken) {
      decoded = jwt.decode(token);
    } else {
      decoded = secret && jwt.verify(userLocal.token, secret);
    }
    // @ts-ignore
    let exp = decoded?.exp;
    const isExpired = Date.now() - exp * 1000 > 0;

    if (isExpired) return null;

    return {
      isAuthenticated: true,
      isLoading: false,
      errorMessage: '',
      userInfo: userLocal,
    };
  } catch (err) {
    console.log(err);
  }
};

const userLoginState = getLocalUser() ? getLocalUser() : initialState.userLogin;

export const userLoginReducer = (state = userLoginState, action: Action) => {
  switch (action.type) {
    case STORE_USER_LOGIN_ISLOADING:
      return { ...state, isLoading: action.payload };
    case STORE_USER_LOGIN_SUCCESS:
      return { isAuthenticated: true, isLoading: false, userInfo: action.payload, errorMessage: '' };
    case STORE_USER_LOGIN_FAIL:
      return { ...state, isLoading: false, errorMessage: action.payload };
    case STORE_USER_LOGOUT:
      return { ...state, isAuthenticated: false, userInfo: null };
    default:
      return state;
  }
};
