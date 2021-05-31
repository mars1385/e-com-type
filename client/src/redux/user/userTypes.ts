// auth
export const LOGIN_START = 'LOGIN_START';
export const REGISTER_START = 'REGISTER_START';

export const GET_USER_INFO = 'GET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

//
export type error = {
  message: string;
  field?: string;
};

export type loginInput = {
  email: string;
  password: string;
};

export type registerInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type userInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type userState = {
  currentUser: userInfo;
  errors: error[];
};
// action type

export type loginUserType = {
  type: typeof LOGIN_START;
  payload: loginInput;
};

export type registerUserType = {
  type: typeof REGISTER_START;
  payload: registerInput;
};

export type getUserType = {
  type: typeof GET_USER_INFO;
};

export type logoutUserType = {
  type: typeof LOGOUT_USER;
};

export type authSuccessType = {
  type: typeof AUTH_SUCCESS;
  payload: userInfo;
};

export type authFailedType = {
  type: typeof AUTH_FAILED;
  payload: error[];
};

export type userAction =
  | loginUserType
  | authSuccessType
  | authFailedType
  | registerUserType
  | getUserType
  | logoutUserType;
