import { AUTH_SUCCESS, AUTH_FAILED, userState, userAction } from './userTypes';

const initialState: userState = {
  currentUser: {
    email: '',
    firstName: '',
    lastName: '',
  },
  errors: [],
};

const userReducers = (state: userState = initialState, action: userAction) => {
  console.log(action);
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errors: [],
      };
    case AUTH_FAILED:
      return {
        ...state,
        currentUser: {
          email: '',
          firstName: '',
          lastName: '',
        },
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;
