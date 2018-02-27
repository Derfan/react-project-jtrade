import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import currency from './currency';
import wallet from './wallet';
import market from './market';

export default combineReducers({
  auth,
  user,
  currency,
  wallet,
  market,
})