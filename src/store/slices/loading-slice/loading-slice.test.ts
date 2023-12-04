import {
  loadingSlice,
  setFavoriteFetchingStatus,
  setOfferFetchingStatus,
  setOffersFetchingStatus,
} from './loading-slice';
import { RequestStatus } from '../../../const';

describe('Loading slice testing', () => {
  it('set different statuses', () => {
    const resultForOffers = loadingSlice.reducer(
      undefined,
      setOffersFetchingStatus(RequestStatus.Pending)
    );

    const resultForOffer = loadingSlice.reducer(
      undefined,
      setOfferFetchingStatus(RequestStatus.Success)
    );

    const resultForFavorite = loadingSlice.reducer(
      undefined,
      setFavoriteFetchingStatus(RequestStatus.Error)
    );

    expect(resultForOffers.offersFetchingStatus).toBe(RequestStatus.Pending);
    expect(resultForOffer.offerFetchingStatus).toBe(RequestStatus.Success);
    expect(resultForFavorite.favoriteFecthingStatus).toBe(RequestStatus.Error);
  });
});
