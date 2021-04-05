import { takeLatest } from 'redux-saga/effects';
import { asyncHandleTodo } from './handlers/todo';

export function* watcherSaga() {
  // yield takeLatest(actions.REQUEST_TODO_LIST, asyncHandleTodo);
  // yield takeLatest(actions.REQUEST_ONE_TODO, asyncHandleTodo);
  // yield takeLatest(actions.REQUEST_DEFAULT_TODO, asyncHandleTodo);
}
