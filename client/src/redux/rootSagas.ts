//import
import { all, call } from 'redux-saga/effects';

import { userAuth } from './user/userSagas';

export default function* rootSaga() {
  yield all([call(userAuth)]);
}
