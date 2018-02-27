import { isFetching, isFetched, error } from "../market";
import {
  sellRequest,
  sellSuccess,
  sellFailure,
  buyRequest,
  buySuccess,
  buyFailure
} from "../../actions/market";

describe("Market reducer", () => {
  const networkError = new Error("test error");

  it("isFetching", () => {
    expect(isFetching(false, sellRequest())).toBeTruthy();
    expect(isFetching(false, sellSuccess())).toBeFalsy();
    expect(isFetching(false, sellFailure())).toBeFalsy();
    expect(isFetching(false, buyRequest())).toBeTruthy();
    expect(isFetching(false, buySuccess())).toBeFalsy();
    expect(isFetching(false, buyFailure())).toBeFalsy();
  });

  it("isFetched", () => {
    expect(isFetched(false, sellRequest())).toBeFalsy();
    expect(isFetched(false, sellSuccess())).toBeTruthy();
    expect(isFetched(false, sellFailure())).toBeTruthy();
    expect(isFetched(false, buyRequest())).toBeFalsy();
    expect(isFetched(false, buySuccess())).toBeTruthy();
    expect(isFetched(false, buyFailure())).toBeTruthy();
  });

  it("error", () => {
    expect(error(null, sellRequest())).toEqual(null);
    expect(error(null, sellSuccess())).toEqual(null);
    expect(error(null, sellFailure(networkError))).toEqual(networkError);
    expect(error(null, buyRequest())).toEqual(null);
    expect(error(null, buySuccess())).toEqual(null);
    expect(error(null, buyFailure(networkError))).toEqual(networkError);
  });
});
