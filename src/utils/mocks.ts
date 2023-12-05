import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import OfferType from '../types/offer-type';
import { faker } from '@faker-js/faker';
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
  latitude: faker.number.float({ min: -90, max: 90, precision: 0.00001 }),
  longitude: faker.number.float({ min: -180, max: 180, precision: 0.000001 }),
  zoom: faker.number.int({ min: 1, max: 17 }),
});

const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: faker.lorem.word(),
});

export const makeFakeOffer = (): OfferType => ({
  id: crypto.randomUUID(),
  title: faker.lorem.lines(1),
  type: faker.lorem.word(),
  price: faker.number.int({ min: 1 }),
  previewImage: faker.image.url(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
});

const makeFakeReviewUser = (): ReviewUser => ({
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
  name: faker.person.firstName(),
});

export const makeFakeReview = (): ReviewType => ({
  comment: faker.lorem.paragraph(),
  date: faker.date.anytime().toISOString(),
  id: faker.number.int({ min: 1 }),
  rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
  user: makeFakeReviewUser(),
});

export const makeFakeUserData = (): UserData => ({
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  token: crypto.randomUUID(),
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
    offersFetchingStatus: faker.datatype.boolean(),
  },
  ...(initialState ?? {}),
});
