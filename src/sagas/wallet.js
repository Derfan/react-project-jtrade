import { call, take, put, fork, cancel } from "redux-saga/effects";

import { loginSuccess, logout } from "../actions/auth";
import { walletRequest, walletSuccess, walletFailure } from "../actions/wallet";
import { getWallet } from "../api";

export function* walletFlow() {
  try {
    const response = yield call(getWallet);

    yield put(walletSuccess(response.data.result));
  } catch (error) {
    yield put(walletFailure(error));
  }
}

export function* walletWatch() {
  let walletTask;

  while (true) {
    const action = yield take([loginSuccess, logout, walletRequest]);

    if (walletTask) {
      yield cancel(walletTask);
      walletTask = undefined;
    }

    if (action.type !== logout.toString()) walletTask = yield fork(walletFlow);
  }
}
