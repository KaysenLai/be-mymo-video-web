import { Action } from '../../../types';
import { REQUEST_USER_LOGIN } from '../../actions/user';
// import { call, put, select } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
import { axiosUserLogin } from '../requests/user';

export function* handleUserLogin(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_LOGIN: {
      try {
        const res = yield call(axiosUserLogin, action.payload);
      } catch (err) {
        console.log(err);
      }
      break;
    }
    default:
      return;
  }
}
