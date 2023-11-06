import { createAction } from '@reduxjs/toolkit';
import OfferType from '../types/offer-type';

export const changeCity = createAction('main/changeCity', (city: string) => ({
  payload: city
}));

export const addOffers = createAction('offers/addOffers', (offers: OfferType[]) => ({
  payload: offers
}));
