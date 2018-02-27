import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset,
} from '../actions/currency';

export const selected = handleActions(
  {
    [selectBtc]: () => 'btc',
    [selectEth]: () => 'eth',
  },
  'btc'
);

export const offset = handleActions(
  {
    [selectOffset]: (state, action) => action.payload,
  },
  '4h'
);

export const isBtcLoading = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false,
  },
  false
);

export const isEthLoading = handleActions(
  {
    [fetchEthRequest]: () => true,
    [fetchEthSuccess]: () => false,
    [fetchEthFailure]: () => false,
  },
  false
);

export const btc = handleActions(
  {
    [fetchBtcSuccess]: (state, action) => action.payload,
  },
  []
);

export const eth = handleActions(
  {
    [fetchEthSuccess]: (state, action) => action.payload,
  },
  []
);

export default combineReducers({
  selected,
  offset,
  isBtcLoading,
  isEthLoading,
  btc,
  eth,
});

export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;

export const getData = state => {
  const { currency } = state;

  return currency[currency.selected];
};

export const getLoading = state => {
  const { currency: { isBtcLoading, isEthLoading } } = state;

  return isBtcLoading || isEthLoading;
};

export const getBtcSell = state => (
  state.currency.btc[0] ? state.currency.btc[0].sell : 0
);

export const getBtcBuy = state => (
  state.currency.btc[0] ? state.currency.btc[0].purchase : 0
);

export const getEthSell = state => (
  state.currency.eth[0] ? state.currency.eth[0].sell : 0
);

export const getEthBuy = state => (
  state.currency.eth[0] ? state.currency.eth[0].purchase : 0
);