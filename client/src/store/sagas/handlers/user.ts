import { Action } from '../../../types';
import {
  REQUEST_USER_LOGIN,
  storeUserLoginFail,
  storeUserLoginIsLoading,
  storeUserLoginSuccess,
} from '../../actions/user';
import { call, put, select } from 'redux-saga/effects';
import { axiosUserLogin } from '../requests/user';

export function* handleUserLogin(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_LOGIN: {
      try {
        yield put(storeUserLoginIsLoading());
        const res = yield call(axiosUserLogin, action.payload);
        yield put(storeUserLoginSuccess(res.data));
      } catch (err) {
        console.log(err.response);
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
