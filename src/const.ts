import City from './types/city';

type CityObject = {
  [key: string]: City;
};

export const DEFAULT_CITY = 'Paris';
export const CARDS_COUNT: number = 5;
export const MAX_OFFER_IMAGES = 6;
export const MAX_REVIEWS_COUNT = 10;
export const MAX_NEARPLACES_COUNT = 3;
export const COMMENT_MIN_LENGTH = 50;
export const COMMENT_MAX_LENGTH = 300;
export const URL_MARKER_DEFAULT = '../public/img/pin.svg';
export const URL_MARKER_CURRENT = '../public/img/pin-active.svg';
export const MAP_LAYER_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const OPENSOURCE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/',
  OfferId = 'offer/:offerId',
  Favorites = '/favorites',
  Error = '/error',
}

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  NearbyOffers = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum MapPage {
  MainPage = 'cities',
  OfferPage = 'offer',
}

export enum CardPage {
  MainPage = 'cities',
  OfferPage = 'near-places',
}

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SortType = {
  POPULAR: 'Popular',
  PRICE_LTH: 'Price: low to high',
  PRICE_HTL: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const MAP_CITY: CityObject = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 12,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 12,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.377956,
      longitude: 4.89707,
      zoom: 12,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.551086,
      longitude: 9.993682,
      zoom: 12,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.233334,
      longitude: 6.783333,
      zoom: 12,
    },
  },
};
