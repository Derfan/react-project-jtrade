import { call, take, put, fork, cancel } from "redux-saga/effects";
import { createMockTask } from "redux-saga/utils";

import { loginSuccess, logout } from "../../actions/auth";
import {
  walletRequest,
  walletSuccess,
  walletFailure
} from "../../actions/wallet";
import { getWallet } from "../../api";
import { walletFlow, walletWatch } from "../wallet";

describe("wallet saga", () => {
  const response = {
    data: {
      result: "test result"
    }
  };
  const error = new Error("Test error");

  describe("watch", () => {
    const saga = walletWatch();
    const walletTask = createMockTask();

    it("1. Effect take loginSuccess, logout, walletRequest", () => {
      expect(saga.next().value).toEqual(
        take([loginSuccess, logout, walletRequest])
      );
    });

    it("2. Effect fork walletFlow", () => {
      expect(saga.next(walletRequest()).value).toEqual(fork(walletFlow));
    });

    it("3. Effect take loginSuccess, logout, walletRequest", () => {
      expect(saga.next(walletTask).value).toEqual(
        take([loginSuccess, logout, walletRequest])
      );
    });

    it("4. Effect cancel walletTask", () => {
      expect(saga.next(logout()).value).toEqual(cancel(walletTask));
    });
  });

  describe("flow", () => {
    const saga = walletFlow();

    it("1. Effect call getWallet", () => {
      expect(saga.next().value).toEqual(call(getWallet));
    });

    it("2. Effect put walletSuccess", () => {
      expect(saga.next(response).value).toEqual(
        put(walletSuccess(response.data.result))
      );
    });
  });

  describe("flow with error", () => {
    const saga = walletFlow();

    it("1. Effect call getWallet", () => {
      expect(saga.next().value).toEqual(call(getWallet));
    });

    it("2. Effect put walletFailure", () => {
      expect(saga.throw(error).value).toEqual(put(walletFailure(error)));
    });
  });
});
