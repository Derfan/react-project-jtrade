import { createActions } from "redux-actions";

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationFailure,
  logout
} = createActions(
  "LOGIN_REQUEST",
  "LOGIN_SUCCESS",
  "LOGIN_FAILURE",
  "REGISTRATION_REQUEST",
  "REGISTRATION_FAILURE",
  "LOGOUT"
);
