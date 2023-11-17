import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice';
import { creatAPI } from '../services/api';
import { loadingSlice } from './slices/loading-slice';
import { authSlice } from './slices/auth-slice';
import { errorSlice } from './slices/error-slice';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [errorSlice.name]: errorSlice.reducer,
});

export const api = creatAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
