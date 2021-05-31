import {
  AUTH_SUCCESS,
  AUTH_FAILED,
  LOGIN_START,
  userInfo,
  loginUserType,
  error,
  authFailedType,
  authSuccessType,
  loginInput,
  registerInput,
  registerUserType,
  REGISTER_START,
  getUserType,
  GET_USER_INFO,
  LOGOUT_USER,
  logoutUserType,
} from './userTypes';

export const loginUser = (userInfo: loginInput): loginUserType => ({
  type: LOGIN_START,
  payload: userInfo,
});

export const registerUser = (registerInput: registerInput): registerUserType => ({
  type: REGISTER_START,
  payload: registerInput,
});

export const getUser = (): getUserType => ({
  type: GET_USER_INFO,
});

export const logoutUser = (): logoutUserType => ({
  type: LOGOUT_USER,
});

export const authSuccess = (user: userInfo): authSuccessType => ({
  type: AUTH_SUCCESS,
  payload: user,
}); //end

export const authFailed = (error: error[]): authFailedType => ({
  type: AUTH_FAILED,
  payload: error,
}); //end
