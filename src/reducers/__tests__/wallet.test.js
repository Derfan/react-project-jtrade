import { isFetching, isFetched, data, error } from "../wallet";
import {
  walletRequest,
  walletSuccess,
  walletFailure
} from "../../actions/wallet";

describe("Wallet reducer", () => {
  const initialData = { usd: 0, btc: 0, eth: 0 };
  const walletData = { usd: 1000, btc: 100, eth: 100 };
  const networkError = new Error("test error");

  it("isFetching", () => {
    expect(isFetching(false, walletRequest())).toBeTruthy();
    expect(isFetching(false, walletSuccess())).toBeFalsy();
    expect(isFetching(false, walletFailure())).toBeFalsy();
  });

  it("isFetched", () => {
    expect(isFetched(false, walletRequest())).toBeFalsy();
    expect(isFetched(false, walletSuccess())).toBeTruthy();
    expect(isFetched(false, walletFailure())).toBeTruthy();
  });

  it("data", () => {
    expect(data(null, walletRequest())).toEqual(initialData);
    expect(data(null, walletSuccess(walletData))).toEqual(walletData);
    expect(data(null, walletFailure())).toEqual(initialData);
  });

  it("error", () => {
    expect(error(null, walletRequest())).toEqual(null);
    expect(error(null, walletSuccess())).toEqual(null);
    expect(error(null, walletFailure(networkError))).toEqual(networkError);
  });
});
