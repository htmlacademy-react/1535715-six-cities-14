import { SortType } from './const';
import OfferType from './types/offer-type';

type sortingObject = {
  [key: string]: (offers: OfferType[]) => OfferType[];
}

export function calculateStarRating(rating: number) {
  return Math.round(rating) * 20;
}

export const sortingCards: sortingObject = {
  [SortType.POPULAR]: (storeOffers) => [...storeOffers],
  [SortType.PRICE_LTH]: (storeOffers) => [...storeOffers].sort(((a, b) => a.price - b.price)),
  [SortType.PRICE_HTL]: (storeOffers) => [...storeOffers].sort((a, b) => b.price - a.price),
  [SortType.TOP_RATED]: (storeOffers) => [...storeOffers].sort((a, b) => b.rating - a.rating)
};
