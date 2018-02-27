import { call, put, take, fork, cancel } from "redux-saga/effects";
import { createMockTask } from "redux-saga/utils";

import { userRequest, userSuccess, userFailure } from "../../actions/user";
import { loginSuccess, logout } from "../../actions/auth";
import { getUserInfo } from "../../api";
import { userFlow, userWatch } from "../user";

describe("user saga", () => {
  const response = {
    data: {
      result: "test result"
    }
  };
  const error = new Error("Test error");

  describe("watch", () => {
    const saga = userWatch();
    const userTask = createMockTask();

    it("1. Effect take loginSuccess, logout, userRequest", () => {
      expect(saga.next().value).toEqual(
        take([loginSuccess, logout, userRequest])
      );
    });

    it("2. Effect fork userFlow", () => {
      expect(saga.next(userRequest()).value).toEqual(fork(userFlow));
    });

    it("3. Effect take loginSuccess, logout, userRequest", () => {
      expect(saga.next(userTask).value).toEqual(
        take([loginSuccess, logout, userRequest])
      );
    });

    it("4. Effect cancel userTask", () => {
      expect(saga.next(logout()).value).toEqual(cancel(userTask));
    });
  });

  describe("flow", () => {
    const saga = userFlow();

    it("1. Effect call getUserInfo", () => {
      expect(saga.next().value).toEqual(call(getUserInfo));
    });

    it("2. Effect put userSuccess", () => {
      expect(saga.next(response).value).toEqual(
        put(userSuccess(response.data.result))
      );
    });
  });

  describe("flow with error", () => {
    const saga = userFlow();

    it("1. Effect call getUserInfo", () => {
      expect(saga.next().value).toEqual(call(getUserInfo));
    });

    it("2. Effect put userFailure", () => {
      expect(saga.throw(error).value).toEqual(put(userFailure(error)));
    });
  });
});
