import { createActions } from "redux-actions";

export const { userRequest, userSuccess, userFailure } = createActions(
  "USER_REQUEST",
  "USER_SUCCESS",
  "USER_FAILURE"
);
