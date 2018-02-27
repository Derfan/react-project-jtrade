import {
  selected,
  offset,
  isBtcLoading,
  isEthLoading,
  btc,
  eth
} from "../currency";
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

describe("Currency reducer", () => {
  const btcData = [1, 2, 3];
  const ethData = [11, 12, 13];

  it("isBtcLoading", () => {
    expect(isBtcLoading(false, fetchBtcRequest())).toBeTruthy();
    expect(isBtcLoading(false, fetchBtcSuccess())).toBeFalsy();
    expect(isBtcLoading(false, fetchBtcFailure())).toBeFalsy();
  });

  it("isEthLoading", () => {
    expect(isEthLoading(false, fetchEthRequest())).toBeTruthy();
    expect(isEthLoading(false, fetchEthSuccess())).toBeFalsy();
    expect(isEthLoading(false, fetchEthFailure())).toBeFalsy();
  });

  it("selected", () => {
    expect(selected("btc", selectEth())).toEqual("eth");
    expect(selected("eth", selectBtc())).toEqual("btc");
  });

  it("offset", () => {
    expect(offset("4h", selectOffset("2h"))).toEqual("2h");
  });

  it("btc", () => {
    expect(btc([], fetchBtcRequest())).toEqual([]);
    expect(btc([], fetchBtcSuccess(btcData))).toEqual(btcData);
    expect(btc([], fetchBtcFailure())).toEqual([]);
  });

  it("eth", () => {
    expect(eth([], fetchEthRequest())).toEqual([]);
    expect(eth([], fetchEthSuccess(ethData))).toEqual(ethData);
    expect(eth([], fetchEthFailure())).toEqual([]);
  });
});
