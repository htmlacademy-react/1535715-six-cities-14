export const CARDS_COUNT: number = 5;
export const IMAGES_MAX_COUNT = 6;
export const COMMENT_MIN_LENGTH = 50;
export const COMMENT_MAX_LENGTH = 300;
export const RANDOM_MOCK_IMAGE = 'https://loremflickr.com/260/200';
export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
export const MAP_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const OPENSOURCE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/',
  OfferId = 'offer/:id',
  Favorites = '/favorites',
  Error = '/error'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UKNOWN'
}

export const Amsterdam = {
  name: 'Amsterdam',
  location: {
    latitude: 52.377956,
    longitude: 4.897070,
    zoom: 12
  }
};
