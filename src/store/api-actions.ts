import OfferType from '../types/offer-type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import {
  addNewComment,
  loadOffers,
  setCertainOfferComments,
  setFavoriteOffers,
  setFullOffer,
  setNearPlaces,
} from './slices/offers-slice';
import { requireAuthorization, setUserData } from './slices/auth-slice';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { removeToken, setToken } from '../services/token';
import {
  setOfferFetchingStatus,
  setOffersFetchingStatus,
} from './slices/loading-slice';
import { setError } from './slices/error-slice';
import FullOfferType from '../types/full-offer';
import ReviewType from '../types/review';
import CommentType from '../types/comment';

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
  dispatch(loadOffers(data));
  dispatch(setOffersFetchingStatus(true));
});

export const fetchOfferAction = createAsyncThunk<
  void,
  OfferType['id'],
  ThunkExtraType
>('fetchOffer', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<FullOfferType>(
    `${APIRoute.Offers}/${offerId}`
  );
  dispatch(setFullOffer(data));
  dispatch(setOfferFetchingStatus(true));
});

export const fetchOfferReviewsAction = createAsyncThunk<
  void,
  OfferType['id'],
  ThunkExtraType
>('fetchOfferReviews', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${APIRoute.Comments}/${offerId}`
  );
  dispatch(setCertainOfferComments(data));
});

export const fetchFavoriteOffersAction = createAsyncThunk<
  void,
  undefined,
  ThunkExtraType
>('fetchFavorite', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
  dispatch(setFavoriteOffers(data));
});

export const fetchNearPlaces = createAsyncThunk<
  void,
  OfferType['id'],
  ThunkExtraType
>('fetchOffer', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(
    `${APIRoute.Offers}/${offerId}/nearby`
  );
  dispatch(setNearPlaces(data));
});

export const fetchCommentAction = createAsyncThunk<
  void,
  CommentType,
  ThunkExtraType
>(
  'fetchComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<ReviewType>(
      `${APIRoute.Comments}/${offerId}`,
      { comment, rating }
    );
    dispatch(addNewComment(data));
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  ThunkExtraType
>('checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<void, AuthData, ThunkExtraType>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    setToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkExtraType>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const clearErrorAction = createAsyncThunk<
  void,
  undefined,
  ThunkExtraType
>('clearError', (_arg, { dispatch }) => {
  setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});
