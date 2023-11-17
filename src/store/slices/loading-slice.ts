import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  offersFetchingStatus: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setOffersFetchingStatus(state, action: PayloadAction<boolean>) {
      state.offersFetchingStatus = action.payload;
    },
  },
});

export const { setOffersFetchingStatus } = loadingSlice.actions;
