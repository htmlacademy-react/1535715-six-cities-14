import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialErrorStateType = {
  error: string | null;
};

const initialState: InitialErrorStateType = {
  error: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;
