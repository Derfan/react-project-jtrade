import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call
} from "redux-saga/effects";
import { createMockTask } from "redux-saga/utils";

import { loginSuccess, logout } from "../../actions/auth";
import { getOffset } from "../../reducers/currency";
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from "../../actions/currency";
import { candles } from "../../api";
import {
  fetchCurrencyFlow,
  currencyWatch,
  fetchBtcFlow,
  fetchEthFlow,
  fetchBtcWatch,
  fetchEthWatch
} from "../currency";

describe("currency saga", () => {
  const response = {
    data: {
      result: "test result"
    }
  };
  const offset = "h4";
  const error = new Error("Test error");

  describe("currencyWatch", () => {
    const saga = currencyWatch();
    const currencyTask = createMockTask();

    it("1. Effect take loginSuccess, logout, selectBtc, selectEth, selectOffset", () => {
      expect(saga.next().value).toEqual(
        take([loginSuccess, logout, selectBtc, selectEth, selectOffset])
      );
    });

    it("2. Effect fork fetchCurrencyFlow", () => {
      expect(saga.next(loginSuccess()).value).toEqual(fork(fetchCurrencyFlow));
    });

    it("3. Effect take loginSuccess, logout, selectBtc, selectEth, selectOffset", () => {
      expect(saga.next(currencyTask).value).toEqual(
        take([loginSuccess, logout, selectBtc, selectEth, selectOffset])
      );
    });

    it("4. Effect cancel currencyTask", () => {
      expect(saga.next(logout()).value).toEqual(cancel(currencyTask));
    });
  });

  describe("fetchCurrencyFlow", () => {
    const saga = fetchCurrencyFlow();

    it("1. Effect select getOffset", () => {
      expect(saga.next().value).toEqual(select(getOffset));
    });

    it("2. Effect put fetchBtcRequest", () => {
      expect(saga.next(offset).value).toEqual(put(fetchBtcRequest(offset)));
    });

    it("3. Effect put fetchEthRequest", () => {
      expect(saga.next(offset).value).toEqual(put(fetchEthRequest(offset)));
    });
  });

  describe("fetchBtcWatch", () => {
    const saga = fetchBtcWatch();

    it("Effect takeLatest fetchBtcRequest", () => {
      expect(saga.next().value).toEqual(
        takeLatest(fetchBtcRequest, fetchBtcFlow)
      );
    });
  });

  describe("fetchBtcFlow", () => {
    const saga = fetchBtcFlow(fetchBtcRequest(offset));

    it("1. Effect call candles", () => {
      expect(saga.next().value).toEqual(call(candles, "btc", offset));
    });

    it("2. Effect put fetchBtcSuccess", () => {
      expect(saga.next(response).value).toEqual(
        put(fetchBtcSuccess(response.data.result))
      );
    });
  });

  describe("fetchBtcFlow with error", () => {
    const saga = fetchBtcFlow(fetchBtcRequest(offset));

    it("1. Effect call candles", () => {
      expect(saga.next().value).toEqual(call(candles, "btc", offset));
    });

    it("2. Effect put fetchBtcFailure", () => {
      expect(saga.throw(error).value).toEqual(put(fetchBtcFailure(error)));
    });
  });

  describe("fetchEthWatch", () => {
    const saga = fetchEthWatch();

    it("Effect takeLatest fetchEthRequest", () => {
      expect(saga.next().value).toEqual(
        takeLatest(fetchEthRequest, fetchEthFlow)
      );
    });
  });

  describe("fetchEthFlow", () => {
    const saga = fetchEthFlow(fetchEthRequest(offset));

    it("1. Effect call candles", () => {
      expect(saga.next().value).toEqual(call(candles, "eth", offset));
    });

    it("2. Effect put fetchEthSuccess", () => {
      expect(saga.next(response).value).toEqual(
        put(fetchEthSuccess(response.data.result))
      );
    });
  });

  describe("fetchEthFlow with error", () => {
    const saga = fetchEthFlow(fetchEthRequest(offset));

    it("1. Effect call candles", () => {
      expect(saga.next().value).toEqual(call(candles, "eth", offset));
    });

    it("2. Effect put fetchEthFailure", () => {
      expect(saga.throw(error).value).toEqual(put(fetchEthFailure(error)));
    });
  });
});
