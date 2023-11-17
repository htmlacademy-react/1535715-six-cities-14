import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null as string | null,
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
