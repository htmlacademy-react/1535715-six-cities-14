import { DEFAULT_CITY } from '../../const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortType } from '../../const';
import OfferType from '../../types/offer-type';
import FullOfferType from '../../types/full-offer';

type InitialStateType = {
  city: string;
  offers: OfferType[] | [];
  sortingType: string;
  activeCard: string | null;
  certainOffer: FullOfferType | null;
  nearPlaces: OfferType[] | null;
  favoriteOffers: OfferType[];
};

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [] as OfferType[],
  sortingType: SortType.POPULAR,
  activeCard: null,
  certainOffer: null,
  nearPlaces: null,
  favoriteOffers: [],
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
      state.nearPlaces = null;
    },
    setFavoriteOffers(state, action: PayloadAction<OfferType[]>) {
      state.favoriteOffers = action.payload;
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
} = offersSlice.actions;
