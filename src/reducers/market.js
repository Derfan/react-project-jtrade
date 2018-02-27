import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux';

import {
  sellRequest,
  sellSuccess,
  sellFailure,
  buyRequest,
  buySuccess,
  buyFailure,
} from '../actions/market';

export const isFetching = handleActions({
  [sellRequest]: () => true,
  [sellSuccess]: () => false,
  [sellFailure]: () => false,
  [buyRequest]: () => true,
  [buySuccess]: () => false,
  [buyFailure]: () => false,
}, false);

export const isFetched = handleActions({
  [sellRequest]: () => false,
  [sellSuccess]: () => true,
  [sellFailure]: () => true,
  [buyRequest]: () => false,
  [buySuccess]: () => true,
  [buyFailure]: () => true,
}, false);

export const error = handleActions({
  [sellRequest]: () => null,
  [sellSuccess]: () => null,
  [sellFailure]: (state, action) => action.payload,
  [buyRequest]: () => null,
  [buySuccess]: () => null,
  [buyFailure]: (state, action) => action.payload,
}, null);

export default combineReducers({
  isFetching,
  isFetched,
  error,
});

export const getError = state => state.market.error;