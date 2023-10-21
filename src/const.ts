const CARDS_COUNT: number = 5;

enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Error = '/error'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UKNOWN'
}

export {CARDS_COUNT, AppRoute, AuthorizationStatus};
