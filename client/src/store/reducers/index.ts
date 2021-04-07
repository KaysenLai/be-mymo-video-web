import { combineReducers } from 'redux';

import { userLoginReducer } from './user';

const reducers = combineReducers({
  userLogin: userLoginReducer,
});

export default reducers;
