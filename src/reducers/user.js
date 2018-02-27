import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux'

import {
  userRequest,
  userSuccess,
  userFailure,
} from '../actions/user';

export const isFetching = handleActions({
    [userRequest]: () => true,
    [userSuccess]: () => false,
    [userFailure]: () => false,
  },
  false
);

export const isFetched = handleActions({
    [userRequest]: () => false,
    [userSuccess]: () => true,
    [userFailure]: () => true,
  },
  false
);

export const data = handleActions({
    [userRequest]: () => null,
    [userSuccess]: (state, action) => action.payload,
    [userFailure]: () => null,
  },
  null
);

export const error = handleActions({
    [userRequest]: () => null,
    [userSuccess]: () => null,
    [userFailure]: (state, action) => action.payload,
  },
  null
);

export default combineReducers({
  isFetching,
  isFetched,
  data,
  error
});

export const getUser = state => state.user.data;