import { call, take, select, put } from "redux-saga/effects";

import {
  loginRequest,
  loginFailure,
  loginSuccess,
  registrationRequest,
  registrationFailure,
  logout
} from "../actions/auth";
import { getIsAuthorized } from "../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../localStorage";
import { login, registration, clearTokenApi, setTokenApi } from "../api";

export function* authWatch() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
      } else {
        const action = yield take([loginRequest, registrationRequest]);

        if (action.type === registrationRequest.toString()) {
          // Registration
          try {
            const response = yield call(registration, action.payload);
            token = response.data.jwt;
          } catch (error) {
            yield put(registrationFailure(error));
          }
        } else if (action.type === loginRequest.toString()) {
          // Login
          try {
            const response = yield call(login, action.payload);
            token = response.data.jwt;
          } catch (error) {
            yield put(loginFailure(error));
          }
        }
      }
    }

    if (token) {
      yield call(setTokenApi, token);
      yield call(setTokenToLocalStorage, token);
      yield put(loginSuccess(token));
      yield take(logout);
      yield call(removeTokenFromLocalStorage);
      yield call(clearTokenApi);
    }
  }
}
