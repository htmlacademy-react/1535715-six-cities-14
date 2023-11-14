import { DEFAULT_CITY } from '../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortType } from '../../const';
import OfferType from '../../types/offer-type';

const initialState = {
  city: DEFAULT_CITY,
  offers: [] as OfferType[],
  sortingType: SortType.POPULAR,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    changeSortingType(state, action: PayloadAction<string>) {
      state.sortingType = action.payload;
    },
    loadOffers(state, action: PayloadAction<OfferType[]>) {
      state.offers = action.payload;
    },
  },
});
