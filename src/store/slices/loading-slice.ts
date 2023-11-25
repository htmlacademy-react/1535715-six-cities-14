import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';

type InitialStateType = {
  offersFetchingStatus: RequestStatus;
  offerFetchingStatus: RequestStatus;
  favoriteFecthingStatus: RequestStatus;
};

const initialState: InitialStateType = {
  offersFetchingStatus: RequestStatus.Idle,
  offerFetchingStatus: RequestStatus.Idle,
  favoriteFecthingStatus: RequestStatus.Idle,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setOffersFetchingStatus(state, action: PayloadAction<RequestStatus>) {
      state.offersFetchingStatus = action.payload;
    },
    setOfferFetchingStatus(state, action: PayloadAction<RequestStatus>) {
      state.offerFetchingStatus = action.payload;
    },
    setFavoriteFetchingStatus(state, action: PayloadAction<RequestStatus>) {
      state.favoriteFecthingStatus = action.payload;
    },
  },
});

export const {
  setOffersFetchingStatus,
  setOfferFetchingStatus,
  setFavoriteFetchingStatus,
} = loadingSlice.actions;
