//import
import { combineReducers } from 'redux';

//reducers
import userReducer from './user/userReducer';
import { userState } from './user/userTypes';

export type appState = {
  user: userState;
};
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
