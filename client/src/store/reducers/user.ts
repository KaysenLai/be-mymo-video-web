import { Action } from '../../types';
import { STORE_USER_LOGIN_FAIL, STORE_USER_LOGIN_SUCCESS, STORE_USER_LOGOUT } from '../actions/user';

export const userLoginReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case STORE_USER_LOGIN_SUCCESS:
      return { loading: true };
    case STORE_USER_LOGIN_FAIL:
      return { loading: false, userInfo: action.payload };
    case STORE_USER_LOGOUT:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
