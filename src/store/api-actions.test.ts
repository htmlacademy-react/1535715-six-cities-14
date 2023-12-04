import { createAPI } from '../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeOffer,
  makeFakeReview,
} from '../utils/mocks';
import {
  checkAuthAction,
  fetchNearPlaces,
  fetchOfferAction,
  fetchOfferReviewsAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
} from './api-actions';
import { APIRoute } from '../const';
import {
  requireAuthorization,
  setUserData,
} from './slices/auth-slice/auth-slice';
import {
  setOfferFetchingStatus,
  setOffersFetchingStatus,
} from './slices/loading-slice/loading-slice';
import {
  dropOffers,
  loadOffers,
  setCertainOfferComments,
  setFullOffer,
  setNearPlaces,
} from './slices/offers-slice/offers-slice';
import { AuthData } from '../types/auth-data';
import * as token from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ offers: { offers: [] } });
  });

  describe('checkAuthAction', () => {
    it('dispatch pending and fulfilled statuses when code is 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        requireAuthorization.type,
        setUserData.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('dispatch pending and fulfilled statuses even when code is 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        requireAuthorization.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('dispatch pending and fulfilled statuses when server responses 200', async () => {
      const mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(2) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        setOffersFetchingStatus.type,
        loadOffers.type,
        setOffersFetchingStatus.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('dispatch pending and fulfilled statuses when server responses 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        setOffersFetchingStatus.type,
        setOffersFetchingStatus.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('dispatch pending and fulfilled statuses when server responses 200', async () => {
      const mockOffer = makeFakeOffer();

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
        .reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(2) as ReturnType<
        typeof fetchOfferAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        setOfferFetchingStatus.type,
        setFullOffer.type,
        setOfferFetchingStatus.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('dispatch pending and fulfilled statuses when server responses 404', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
        .reply(404, []);

      await store.dispatch(fetchOfferAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        setOfferFetchingStatus.type,
        fetchOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearPlaces', () => {
    it('dispatch pending and fulfilled when server responses code 200', async () => {
      const mockNearOffers = Array.from({ length: 3 }, () => makeFakeOffer());
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockNearOffers[0].id}/nearby`)
        .reply(200, mockNearOffers);

      await store.dispatch(fetchNearPlaces(mockNearOffers[0].id));

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOfferAction.fulfilled
      >;

      expect(actions).toEqual([
        fetchNearPlaces.pending.type,
        setNearPlaces.type,
        fetchNearPlaces.fulfilled.type,
      ]);
      expect(fetchOfferActionFulfilled.payload).toEqual(mockNearOffers);
    });

    it('dispatch pending and rejected when server responses code 404', async () => {
      const offerMockId = crypto.randomUUID();

      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerMockId}/nearby`);

      await store.dispatch(fetchNearPlaces(offerMockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearPlaces.pending.type,
        fetchNearPlaces.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('dispatch pending and fulfilled statuses when server responses 200', async () => {
      const mockReviews = Array.from({ length: 3 }, () => makeFakeReview());
      const mockOfferId = makeFakeOffer().id;

      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(200, mockReviews);

      await store.dispatch(fetchOfferReviewsAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOfferReviewsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviewsAction.pending.type,
        setCertainOfferComments.type,
        fetchOfferReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('dispatch pending and rejected statuses when server responses 404', async () => {
      const mockOfferId = makeFakeOffer().id;
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(400, []);

      await store.dispatch(fetchOfferReviewsAction(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('dispatch pending and fulfilled statuses with other dipatches when server responses 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123abc' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        requireAuthorization.type,
        setUserData.type,
        dropOffers.type,
        fetchOffersAction.pending.type,
        setOffersFetchingStatus.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('call "saveToken" with received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123abc' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);
      const mockSaveToken = vi.spyOn(token, 'setToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(fakeServerReply.token);
    });
  });

  describe('logoutAction', () => {
    it('dispatch pending and fulfilled statuses with other dipatches when server responses 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        requireAuthorization.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('call "removeToken"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockSaveToken = vi.spyOn(token, 'removeToken');

      await store.dispatch(logoutAction());

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
    });
  });
});
