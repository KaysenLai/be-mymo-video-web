import { takeLatest } from 'redux-saga/effects';
import { REQUEST_USER_LOGIN } from '../actions/user';
import { handleUserLogin } from './handlers/user';

export function* watcherSaga() {
  yield takeLatest(REQUEST_USER_LOGIN, handleUserLogin);
}
