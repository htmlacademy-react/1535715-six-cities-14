import { DEFAULT_CITY } from '../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import OfferMocks from '../../mocks/offer-mocks';
import { SortType } from '../../const';

const initialState = {
  city: DEFAULT_CITY,
  offers: OfferMocks,
  sortingType: SortType.POPULAR
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
    }
  }
});
