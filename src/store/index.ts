import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { reducer } from './reducer';
import { offersSlice } from './slices/offers-slice';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
});

export const store = configureStore({reducer});
