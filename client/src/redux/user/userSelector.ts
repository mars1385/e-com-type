import { createSelector } from 'reselect';
import { appState } from '../rootReducers';

const selectUserReducer = (state: appState) => state.user;

export const selectCurrentUser = createSelector([selectUserReducer], (user) => user.currentUser);

export const selectErrors = createSelector([selectUserReducer], (user) => user.errors);
