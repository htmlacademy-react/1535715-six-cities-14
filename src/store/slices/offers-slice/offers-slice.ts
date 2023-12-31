import { DEFAULT_CITY } from '../../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortType } from '../../../const';
import OfferType from '../../../types/offer-type';
import FullOfferType from '../../../types/full-offer';
import ReviewType from '../../../types/review';

type InitialOffersStateType = {
  city: string;
  offers: OfferType[];
  sortingType: string;
  activeCard: string | null;
  certainOffer: FullOfferType | null;
  nearPlaces: OfferType[];
  favoriteOffers: OfferType[];
  certainOfferReviews: ReviewType[];
};

const initialState: InitialOffersStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sortingType: SortType.POPULAR,
  activeCard: null,
  certainOffer: null,
  nearPlaces: [],
  favoriteOffers: [],
  certainOfferReviews: [],
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    changeSortingType(state, action: PayloadAction<string>) {
      state.sortingType = action.payload;
    },
    loadOffers(state, action: PayloadAction<OfferType[]>) {
      state.offers = action.payload;
    },
    dropOffers(state) {
      state.offers = [];
    },
    getActiveCard(state, action: PayloadAction<string | null>) {
      state.activeCard = action.payload;
    },
    setFullOffer(state, action: PayloadAction<FullOfferType>) {
      state.certainOffer = action.payload;
    },
    setNearPlaces(state, action: PayloadAction<OfferType[]>) {
      state.nearPlaces = action.payload;
    },
    dropCertainOffer(state) {
      state.certainOffer = null;
      state.nearPlaces = [];
      state.certainOfferReviews = [];
    },
    setFavoriteOffers(state, action: PayloadAction<OfferType[]>) {
      state.favoriteOffers = action.payload;
    },
    updateOfferFavoriteStatus(state, action: PayloadAction<OfferType>) {
      const updatedOffer = state.offers.find(
        (offer) => offer.id === action.payload.id
      );

      if (updatedOffer) {
        updatedOffer.isFavorite = !updatedOffer.isFavorite;
      }

      switch (action.payload.isFavorite) {
        case true: {
          state.favoriteOffers.push(action.payload);
          break;
        }
        case false: {
          state.favoriteOffers = state.favoriteOffers.filter(
            ({ id }) => id !== action.payload.id
          );
        }
      }
    },
    setCertainOfferComments(state, action: PayloadAction<ReviewType[]>) {
      state.certainOfferReviews = action.payload;
    },
    addNewComment(state, action: PayloadAction<ReviewType>) {
      state.certainOfferReviews.push(action.payload);
    },
  },
});

export const {
  changeCity,
  changeSortingType,
  getActiveCard,
  loadOffers,
  setFullOffer,
  setNearPlaces,
  dropCertainOffer,
  setFavoriteOffers,
  setCertainOfferComments,
  addNewComment,
  updateOfferFavoriteStatus,
  dropOffers,
} = offersSlice.actions;
