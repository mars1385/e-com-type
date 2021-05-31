//import
import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import { authFailed, authSuccess } from './userActions';
import {
  LOGIN_START,
  loginUserType,
  REGISTER_START,
  registerUserType,
  GET_USER_INFO,
  getUserType,
  LOGOUT_USER,
} from './userTypes';
// ----------------------saga actions-------------------------

//auth info login action
function* setAuthInfo({ type, payload }: loginUserType) {
  try {
    const userResponse = yield axios.post('/api/auth/login', payload);

    if (userResponse.status === 200) {
      yield setUserInfo();
    }
  } catch (error) {
    yield put(authFailed(error.response.data.errors));
  }
}

function* registerUser({ type, payload }: registerUserType) {
  try {
    const userResponse = yield axios.post('/api/auth/register', payload);

    if (userResponse.status === 200) {
      yield setUserInfo();
    }
  } catch (error) {
    yield put(authFailed(error.response.data.errors));
  }
}

export function* setUserInfo() {
  try {
    const userResponse = yield axios.get('/api/auth/user');

    yield put(authSuccess(userResponse.data.user));
  } catch (error) {
    yield put(authFailed(error.response.data.errors));
  }
}

export function* logoutUser() {
  try {
    const userResponse = yield axios.post('/api/auth/logout');

    yield put(
      authSuccess({
        email: '',
        firstName: '',
        lastName: '',
      })
    );
  } catch (error) {
    yield put(authFailed(error.response.data.errors));
  }
}

// ----------------------saga handlers------------------------
//email & password (auth info) login
export function* authInfoLoginHandler() {
  yield takeLatest(LOGIN_START, setAuthInfo);
}

export function* registerHandler() {
  yield takeLatest(REGISTER_START, registerUser);
}

export function* getUserHandler() {
  yield takeLatest(GET_USER_INFO, setUserInfo);
}

export function* logoutUserHandler() {
  yield takeLatest(LOGOUT_USER, logoutUser);
}
// ----------------------export all---------------------------
export function* userAuth() {
  yield all([
    call(authInfoLoginHandler),
    call(registerHandler),
    call(getUserHandler),
    call(logoutUserHandler),
  ]);
}
