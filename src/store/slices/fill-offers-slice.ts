import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import OfferMocks from '../../mocks/offer-mocks';
import OfferType from '../../types/offer-type';

const initialState = {
  offers: OfferMocks
};

export const fillOffersSlice = createSlice({
  name: 'fillOffers',
  initialState,
  reducers: {
    fillOffers(state, action: PayloadAction<OfferType[]>) {
      state.offers = action.payload;
    }
  }
});
