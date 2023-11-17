import MainPage from '../pages/main';
import LoginPage from '../pages/login';
import FavouritePage from '../pages/favourite';
import OfferPage from '../pages/offer';
import Error from '../pages/error';
import PrivateRoute from './private-route';
import RedirectionRoute from './redirect-route';
import ReviewType from '../types/review';
import { AppRoute } from '../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks';

type AppProps = {
  reviews: ReviewType[];
}

export default function App({ reviews }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);

  return (
    <BrowserRouter>
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
        <Route path={AppRoute.OfferId} element={<OfferPage reviews={reviews} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
