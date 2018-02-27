import { isFetching, isFetched, data, error } from "../user";
import { userRequest, userSuccess, userFailure } from "../../actions/user";

describe("User reducer", () => {
  const user = { email: "test@test.ru" };
  const networkError = new Error("test error");

  it("isFetching", () => {
    expect(isFetching(false, userRequest())).toBeTruthy();
    expect(isFetching(false, userSuccess())).toBeFalsy();
    expect(isFetching(false, userFailure())).toBeFalsy();
  });

  it("isFetched", () => {
    expect(isFetched(false, userRequest())).toBeFalsy();
    expect(isFetched(false, userSuccess())).toBeTruthy();
    expect(isFetched(false, userFailure())).toBeTruthy();
  });

  it("user", () => {
    expect(data(null, userRequest())).toEqual(null);
    expect(data(null, userSuccess(user))).toEqual(user);
    expect(data(null, userFailure())).toEqual(null);
  });

  it("error", () => {
    expect(error(null, userRequest())).toEqual(null);
    expect(error(null, userSuccess())).toEqual(null);
    expect(error(null, userFailure(networkError))).toEqual(networkError);
  });
});
