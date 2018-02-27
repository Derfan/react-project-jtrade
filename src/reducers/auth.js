import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux'

import {
  loginRequest,
  loginFailure,
  loginSuccess,
  registrationRequest,
  registrationFailure,
  logout
} from '../actions/auth';

export const isFetching = handleActions({
    [loginRequest]: () => true,
    [loginSuccess]: () => false,
    [loginFailure]: () => false,
    [registrationRequest]: () => true,
    [registrationFailure]: () => false,
    [logout]: () => false,
  },
  false
);

export const isFetched = handleActions({
    [loginRequest]: () => false,
    [loginSuccess]: () => true,
    [loginFailure]: () => true,
    [registrationRequest]: () => false,
    [registrationFailure]: () => true,
    [logout]: () => false,
  },
  false
);

export const token = handleActions({
    [loginRequest]: () => null,
    [loginSuccess]: (state, action) => action.payload,
    [loginFailure]: () => null,
    [registrationRequest]: () => null,
    [registrationFailure]: () => null,
    [logout]: () => null,
  },
  null
);

export const error = handleActions({
    [loginRequest]: () => null,
    [loginSuccess]: () => null,
    [loginFailure]: (state, action) => action.payload,
    [registrationRequest]: () => null,
    [registrationFailure]: (state, action) => action.payload,
    [logout]: () => null,
  },
  null
);

export default combineReducers({
  isFetching,
  isFetched,
  token,
  error
});

export const getIsAuthorized = state => !!state.auth.token;

export const getError = state => {
  const { error } = state.auth;

  if (error) {
    if (error.data && error.data.message) {
      return error.data.message;
    }

    return 'Network error';
  }

  return null;
};