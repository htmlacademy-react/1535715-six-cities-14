import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setOffersLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});
