import OfferType from '../types/offer-type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, RequestStatus } from '../const';
import {
  addNewComment,
  dropOffers,
  loadOffers,
  setCertainOfferComments,
  setFavoriteOffers,
  setFullOffer,
  setNearPlaces,
  updateOfferFavoriteStatus,
} from './slices/offers-slice/offers-slice';
import {
  requireAuthorization,
  setUserData,
} from './slices/auth-slice/auth-slice';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { removeToken, setToken } from '../services/token';
import {
  setFavoriteFetchingStatus,
  setOfferFetchingStatus,
  setOffersFetchingStatus,
} from './slices/loading-slice/loading-slice';
import FullOfferType from '../types/full-offer';
import ReviewType from '../types/review';
import CommentType from '../types/comment';
import FavoriteStatusType from '../types/favorite-status';

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
  try {
    dispatch(setOffersFetchingStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersFetchingStatus(false));
  } catch {
    dispatch(setOffersFetchingStatus(false));
  }
});

export const fetchOfferAction = createAsyncThunk<
  void,
  OfferType['id'],
  ThunkExtraType
>('fetchOffer', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<FullOfferType>(
      `${APIRoute.Offers}/${offerId}`
    );
    dispatch(setOfferFetchingStatus(RequestStatus.Pending));
    dispatch(setFullOffer(data));
    dispatch(setOfferFetchingStatus(RequestStatus.Success));
  } catch {
    dispatch(setOfferFetchingStatus(RequestStatus.Error));
  }
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
  dispatch(setFavoriteFetchingStatus(RequestStatus.Success));
});

export const changeFavoriteStatus = createAsyncThunk<
  void,
  FavoriteStatusType,
  ThunkExtraType
>(
  'changeFavoriteStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferType>(
      `${APIRoute.Favorite}/${offerId}/${status}`
    );

    dispatch(updateOfferFavoriteStatus(data));
  }
);

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
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });

    setToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    dispatch(dropOffers());
    dispatch(fetchOffersAction());
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
