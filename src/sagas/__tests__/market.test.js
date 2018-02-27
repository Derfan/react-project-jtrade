import { call, put, takeEvery } from "redux-saga/effects";

import { sellCurrency, buyCurrency } from "../../api";
import {
  sellRequest,
  sellSuccess,
  sellFailure,
  buyRequest,
  buySuccess,
  buyFailure
} from "../../actions/market";
import { walletRequest } from "../../actions/wallet";
import { sellWatch, buyWatch, sellFlow, buyFlow } from "../market";

describe("market saga", () => {
  const error = new Error("Test error");
  const currency = "btc";
  const value = 100;
  const payload = { currency, value };

  describe("sellWatch", () => {
    const saga = sellWatch();

    it("Effect takeEvery sellRequest", () => {
      expect(saga.next().value).toEqual(takeEvery(sellRequest, sellFlow));
    });
  });

  describe("buyWatch", () => {
    const saga = buyWatch();

    it("Effect takeEvery buyRequest", () => {
      expect(saga.next().value).toEqual(takeEvery(buyRequest, buyFlow));
    });
  });

  describe("sellFlow", () => {
    const saga = sellFlow(sellRequest(payload));

    it("1. Effect call sellCurrency", () => {
      expect(saga.next().value).toEqual(call(sellCurrency, currency, value));
    });

    it("2. Effect put sellSuccess", () => {
      expect(saga.next().value).toEqual(put(sellSuccess()));
    });

    it("3. Effect put walletRequest", () => {
      expect(saga.next().value).toEqual(put(walletRequest()));
    });
  });

  describe("buyFlow", () => {
    const saga = buyFlow(buyRequest(payload));

    it("1. Effect call buyCurrency", () => {
      expect(saga.next().value).toEqual(call(buyCurrency, currency, value));
    });

    it("2. Effect put buySuccess", () => {
      expect(saga.next().value).toEqual(put(buySuccess()));
    });

    it("3. Effect put walletRequest", () => {
      expect(saga.next().value).toEqual(put(walletRequest()));
    });
  });

  describe("sellFlow with error", () => {
    const saga = sellFlow(sellRequest(payload));

    it("1. Effect call sellCurrency", () => {
      expect(saga.next().value).toEqual(call(sellCurrency, currency, value));
    });

    it("2. Effect put sellFailure", () => {
      expect(saga.throw(error).value).toEqual(put(sellFailure(error)));
    });
  });

  describe("buyFlow with error", () => {
    const saga = buyFlow(buyRequest(payload));

    it("1. Effect call buyCurrency", () => {
      expect(saga.next().value).toEqual(call(buyCurrency, currency, value));
    });

    it("2. Effect put buyFailure", () => {
      expect(saga.throw(error).value).toEqual(put(buyFailure(error)));
    });
  });
});
