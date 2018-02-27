import { call, take, select, put } from "redux-saga/effects";

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationFailure,
  logout
} from "../../actions/auth";
import { getIsAuthorized } from "../../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from "../../localStorage";
import { login, registration, clearTokenApi, setTokenApi } from "../../api";
import { authWatch } from "../auth";

describe("auth saga", () => {
  const saga = authWatch();
  const token = "token";

  const userData = {
    email: "test@mail.ru",
    password: "test"
  };

  const response = {
    data: {
      jwt: token
    }
  };

  const error = new Error("Test error");

  describe("Registration", () => {
    it("1. Effect select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Effect call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Effect take loginRequest or registrationRequest", () => {
      expect(saga.next().value).toEqual(
        take([loginRequest, registrationRequest])
      );
    });

    it("4. Effect call api registration", () => {
      expect(saga.next(registrationRequest(userData)).value).toEqual(
        call(registration, userData)
      );
    });

    it("5. Effect call setTokenApi", () => {
      expect(saga.next(response).value).toEqual(call(setTokenApi, token));
    });

    it("6. Effect call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it("7. Effect put loginSuccess", () => {
      expect(saga.next().value).toEqual(put(loginSuccess(token)));
    });

    it("8. Effect take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("9. Effect call removeTokenFromLocalStorage", () => {
      expect(saga.next(logout()).value).toEqual(
        call(removeTokenFromLocalStorage)
      );
    });

    it("10. Effect call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe("Login without localStorage", () => {
    it("1. Effect select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Effect call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Effect take loginRequest or registrationRequest", () => {
      expect(saga.next().value).toEqual(
        take([loginRequest, registrationRequest])
      );
    });

    it("4. Effect call api login", () => {
      expect(saga.next(loginRequest(userData)).value).toEqual(
        call(login, userData)
      );
    });

    it("5. Effect call setTokenApi", () => {
      expect(saga.next(response).value).toEqual(call(setTokenApi, token));
    });

    it("6. Effect call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it("7. Effect put loginSuccess", () => {
      expect(saga.next().value).toEqual(put(loginSuccess(token)));
    });

    it("8. Effect take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("9. Effect call removeTokenFromLocalStorage", () => {
      expect(saga.next(logout()).value).toEqual(
        call(removeTokenFromLocalStorage)
      );
    });

    it("10. Effect call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe("Login with localStorage", () => {
    it("1. Effect select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Effect call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Effect call setTokenApi", () => {
      expect(saga.next(token).value).toEqual(call(setTokenApi, token));
    });

    it("4. Effect call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });

    it("5. Effect put loginSuccess", () => {
      expect(saga.next().value).toEqual(put(loginSuccess(token)));
    });

    it("6. Effect take logout", () => {
      expect(saga.next().value).toEqual(take(logout));
    });

    it("7. Effect call removeTokenFromLocalStorage", () => {
      expect(saga.next(logout()).value).toEqual(
        call(removeTokenFromLocalStorage)
      );
    });

    it("8. Effect call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe("Error on registration", () => {
    it("1. Effect select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Effect call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Effect take loginRequest or registrationRequest", () => {
      expect(saga.next().value).toEqual(
        take([loginRequest, registrationRequest])
      );
    });

    it("4. Effect call api registration", () => {
      expect(saga.next(registrationRequest(userData)).value).toEqual(
        call(registration, userData)
      );
    });

    it("5. Effect put loginSuccess", () => {
      expect(saga.throw(error).value).toEqual(put(registrationFailure(error)));
    });
  });

  describe("Error on login", () => {
    it("1. Effect select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Effect call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Effect take loginRequest or registrationRequest", () => {
      expect(saga.next().value).toEqual(
        take([loginRequest, registrationRequest])
      );
    });

    it("4. Effect call api login", () => {
      expect(saga.next(loginRequest(userData)).value).toEqual(
        call(login, userData)
      );
    });

    it("5. Effect put loginSuccess", () => {
      expect(saga.throw(error).value).toEqual(put(loginFailure(error)));
    });
  });
});
