import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    }
  }
});
