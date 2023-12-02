import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import OfferType from '../types/offer-type';
import { datatype, lorem, image, internet, name } from 'faker';
import City from '../types/city';
import Location from '../types/location';
import ReviewType from '../types/review';
import ReviewUser from '../types/review-user';
import { UserData } from '../types/user-data';
import { AuthorizationStatus, Cities, RequestStatus, SortType } from '../const';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

const makeFakeLocation = (): Location => ({
  latitude: datatype.number({ min: -90, max: 90, precision: 0.00001 }),
  longitude: datatype.number({ min: -180, max: 180, precision: 0.000001 }),
  zoom: datatype.number({ min: 1, max: 17 }),
});

const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: lorem.word(),
});

export const makeFakeOffer = (): OfferType => ({
  id: datatype.uuid(),
  title: lorem.lines(1),
  type: lorem.word(),
  price: datatype.number({ min: 1 }),
  previewImage: image.imageUrl(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
});

const makeFakeReviewUser = (): ReviewUser => ({
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  name: name.firstName(),
});

export const makeFakeReview = (): ReviewType => ({
  comment: lorem.paragraph(),
  date: datatype.datetime().toISOString(),
  id: datatype.number({ min: 1, max: 100 }),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  user: makeFakeReviewUser(),
});

export const makeFakeUserData = (): UserData => ({
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  email: internet.email(),
  token: datatype.uuid(),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  offers: {
    activeCard: null,
    certainOffer: null,
    certainOfferReviews: [],
    city: Cities[0],
    favoriteOffers: [makeFakeOffer()],
    nearPlaces: [],
    offers: [makeFakeOffer()],
    sortingType: SortType.POPULAR,
  },
  auth: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: makeFakeUserData(),
  },
  error: { error: null },
  loading: {
    favoriteFecthingStatus: RequestStatus.Idle,
    offerFetchingStatus: RequestStatus.Idle,
    offersFetchingStatus: RequestStatus.Idle,
  },
  ...(initialState ?? {}),
});
