import { createActions } from "redux-actions";

export const {
  sellRequest,
  sellSuccess,
  sellFailure,
  buyRequest,
  buySuccess,
  buyFailure
} = createActions(
  "SELL_REQUEST",
  "SELL_SUCCESS",
  "SELL_FAILURE",
  "BUY_REQUEST",
  "BUY_SUCCESS",
  "BUY_FAILURE"
);
