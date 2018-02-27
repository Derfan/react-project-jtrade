import { call, put, take, fork, cancel } from "redux-saga/effects";

import { userRequest, userSuccess, userFailure } from "../actions/user";
import { loginSuccess, logout } from "../actions/auth";
import { getUserInfo } from "../api";

export function* userFlow() {
  try {
    const response = yield call(getUserInfo);
    yield put(userSuccess(response.data.result));
  } catch (error) {
    yield put(userFailure(error));
  }
}

export function* userWatch() {
  let userTask;

  while (true) {
    const action = yield take([loginSuccess, logout, userRequest]);

    if (userTask) {
      yield cancel(userTask);
      userTask = undefined;
    }

    if (action.type !== logout.toString()) userTask = yield fork(userFlow);
  }
}
