import { DEFAULT_CITY } from '../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: DEFAULT_CITY
};

export const changeCitySlice = createSlice({
  name: 'changeCity',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    }
  }
});
