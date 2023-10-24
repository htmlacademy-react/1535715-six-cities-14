const CARDS_COUNT: number = 5;
const IMAGES_MAX_COUNT = 6;
const RANDOM_MOCK_IMAGE = 'https://loremflickr.com/260/200';

enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/',
  OfferId = 'offer/:id',
  Favorites = '/favorites',
  Error = '/error'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UKNOWN'
}

export {CARDS_COUNT, AppRoute, AuthorizationStatus, RANDOM_MOCK_IMAGE, IMAGES_MAX_COUNT};
