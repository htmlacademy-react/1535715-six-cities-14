import { SortType } from '../../../const';
import {
  changeCity,
  changeSortingType,
  dropOffers,
  getActiveCard,
  offersSlice,
} from './offers-slice';
import { datatype } from 'faker';

describe('Offers slice testing', () => {
  const initialState = {
    city: 'Paris',
    offers: [],
    sortingType: 'Popular',
    activeCard: null,
    certainOffer: null,
    nearPlaces: [],
    favoriteOffers: [],
    certainOfferReviews: [],
  };

  it('return initial state if action is empty', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('return initial state if action is undefined', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('change selected city correctly', () => {
    const newCity = 'Amsterdam';

    const result = offersSlice.reducer(initialState, changeCity(newCity));

    expect(result.city).toBe(newCity);
  });

  it('change sorting type correctly', () => {
    const newSortingType = SortType.PRICE_HTL;

    const result = offersSlice.reducer(
      initialState,
      changeSortingType(newSortingType)
    );

    expect(result.sortingType).toBe(newSortingType);
  });

  it('drop all offers', () => {
    const result = offersSlice.reducer(initialState, dropOffers());

    expect(result.offers).toEqual([]);
  });

  describe('Active card tests', () => {
    it('set active card', () => {
      const activeCardId = datatype.uuid();

      const result = offersSlice.reducer(
        initialState,
        getActiveCard(activeCardId)
      );

      expect(result.activeCard).toBe(activeCardId);
    });

    it('remove active card', () => {
      const result = offersSlice.reducer(initialState, getActiveCard(null));

      expect(result.activeCard).toBeNull();
    });
  });
});
