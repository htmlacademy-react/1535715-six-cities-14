import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  offersFetchingStatus: false,
  offerFetchingStatus: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setOffersFetchingStatus(state, action: PayloadAction<boolean>) {
      state.offersFetchingStatus = action.payload;
    },
    setOfferFetchingStatus(state, action: PayloadAction<boolean>) {
      state.offerFetchingStatus = action.payload;
    },
  },
});

export const { setOffersFetchingStatus, setOfferFetchingStatus } =
  loadingSlice.actions;
