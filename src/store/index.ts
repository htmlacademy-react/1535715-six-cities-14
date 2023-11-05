import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { reducer } from './reducer';
import { changeCitySlice } from './slices/change-city-slice';
import { fillOffersSlice } from './slices/fill-offers-slice';

const reducer = combineReducers({
  [changeCitySlice.name]: changeCitySlice.reducer,
  [fillOffersSlice.name]: fillOffersSlice.reducer
});

export const store = configureStore({reducer});
