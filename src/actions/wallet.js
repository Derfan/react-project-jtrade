import { createActions } from "redux-actions";

export const { walletRequest, walletSuccess, walletFailure } = createActions(
  "WALLET_REQUEST",
  "WALLET_SUCCESS",
  "WALLET_FAILURE"
);
