import { createReducer } from '@reduxjs/toolkit';
import { changeCity, addOffers } from './action';
import OfferType from '../types/offer-type';

type InitialState = {
  city: string;
  offers: OfferType[];
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload;
    });
});
