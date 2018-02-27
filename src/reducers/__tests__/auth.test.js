import { isFetching, isFetched, token, error } from "../auth";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationFailure,
  logout
} from "../../actions/auth";

describe("Auth reducer", () => {
  const tokenStr = "token";
  const networkError = new Error("test error");

  it("isFetching", () => {
    expect(isFetching(false, loginRequest())).toBeTruthy();
    expect(isFetching(false, loginFailure())).toBeFalsy();
    expect(isFetching(false, loginSuccess())).toBeFalsy();
    expect(isFetching(false, registrationRequest())).toBeTruthy();
    expect(isFetching(false, registrationFailure())).toBeFalsy();
    expect(isFetching(false, logout())).toBeFalsy();
  });

  it("isFetched", () => {
    expect(isFetched(false, loginRequest())).toBeFalsy();
    expect(isFetched(false, loginFailure())).toBeTruthy();
    expect(isFetched(false, loginSuccess())).toBeTruthy();
    expect(isFetched(false, registrationRequest())).toBeFalsy();
    expect(isFetched(false, registrationFailure())).toBeTruthy();
    expect(isFetched(false, logout())).toBeFalsy();
  });

  it("token", () => {
    expect(token(null, loginRequest())).toEqual(null);
    expect(token(null, loginFailure())).toEqual(null);
    expect(token(null, loginSuccess(tokenStr))).toEqual(tokenStr);
    expect(token(null, registrationRequest())).toEqual(null);
    expect(token(null, registrationFailure())).toEqual(null);
    expect(token(null, logout())).toEqual(null);
  });

  it("error", () => {
    expect(error(null, loginRequest())).toEqual(null);
    expect(error(null, loginFailure(networkError))).toEqual(networkError);
    expect(error(null, loginSuccess())).toEqual(null);
    expect(error(null, registrationRequest())).toEqual(null);
    expect(error(null, registrationFailure(networkError))).toEqual(
      networkError
    );
    expect(error(null, logout())).toEqual(null);
  });
});
