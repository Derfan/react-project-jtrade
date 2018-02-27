import { call, put, takeEvery } from "redux-saga/effects";

import { sellCurrency, buyCurrency } from "../api";
import {
  sellRequest,
  sellSuccess,
  sellFailure,
  buyRequest,
  buySuccess,
  buyFailure
} from "../actions/market";
import { walletRequest } from "../actions/wallet";

export function* sellFlow(action) {
  try {
    const { currency, value } = action.payload;

    yield call(sellCurrency, currency, value);
    yield put(sellSuccess());
    yield put(walletRequest());
  } catch (error) {
    yield put(sellFailure(error));
  }
}

export function* buyFlow(action) {
  try {
    const { currency, value } = action.payload;

    yield call(buyCurrency, currency, value);
    yield put(buySuccess());
    yield put(walletRequest());
  } catch (error) {
    yield put(buyFailure(error));
  }
}

export function* sellWatch() {
  yield takeEvery(sellRequest, sellFlow);
}

export function* buyWatch() {
  yield takeEvery(buyRequest, buyFlow);
}
