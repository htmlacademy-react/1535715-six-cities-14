import MainPage from '../pages/main';
import LoginPage from '../pages/login';
import FavouritePage from '../pages/favourite';
import OfferPage from '../pages/offer';
import Error from '../pages/error';
import PrivateRoute from './private-route/private-route';
import RedirectionRoute from './redirect-route/redirect-route';
import { AppRoute } from '../const';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import ScrollTopComponent from './scroll-to-top/scroll-to-top';
import { HistoryRouter } from './history-route/history-route';
import { browserHistory } from '../browser-history';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollTopComponent />
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route
          path={AppRoute.Login}
          element={
            <RedirectionRoute authorizationStatus={authorizationStatus}>
              <LoginPage />
            </RedirectionRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus} redirectionTo={AppRoute.Login}>
              <FavouritePage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.OfferId} element={<OfferPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </HistoryRouter>
  );
}
