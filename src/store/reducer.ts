import { createReducer } from '@reduxjs/toolkit';
import OfferMocks from '../mocks/offer-mocks';
import { changeCity, addOffers } from './action';

const initialState = {
  city: 'Paris',
  offers: OfferMocks
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
