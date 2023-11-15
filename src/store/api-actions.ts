import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import OfferType from '../types/offer-type';
import { APIRoute, AuthorizationStatus } from '../const';
import { offersSlice } from './slices/offers-slice';
import { authSlice } from './slices/auth-slice';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { removeToken, setToken } from '../services/token';
import { loadingSlice } from './slices/loading-slice';

type ThunkExtraType = {
  dipatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  ThunkExtraType
>('fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(APIRoute.Offers);
  dispatch(loadingSlice.actions.setOffersLoadingStatus(false));
  dispatch(offersSlice.actions.loadOffers(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  ThunkExtraType
>('checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(authSlice.actions.requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(
      authSlice.actions.requireAuthorization(AuthorizationStatus.NoAuth)
    );
  }
});

export const loginAction = createAsyncThunk<void, AuthData, ThunkExtraType>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    setToken(token);
    dispatch(authSlice.actions.requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkExtraType>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(
      authSlice.actions.requireAuthorization(AuthorizationStatus.NoAuth)
    );
  }
);
