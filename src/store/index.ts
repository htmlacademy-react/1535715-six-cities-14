import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice/offers-slice';
import { createAPI } from '../services/api';
import { loadingSlice } from './slices/loading-slice/loading-slice';
import { authSlice } from './slices/auth-slice/auth-slice';
import { errorSlice } from './slices/error-slice/error-slice';

export const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [errorSlice.name]: errorSlice.reducer,
});

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
