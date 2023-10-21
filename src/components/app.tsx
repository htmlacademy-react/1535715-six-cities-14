import MainPage from '../pages/main';
import LoginPage from '../pages/login';
import FavouritePage from '../pages/favourite';
import OfferPage from '../pages/offer';
import Error from '../pages/error';
import PrivateRouteComponent from './private-route';
import { CARDS_COUNT, AppRoute, AuthorizationStatus } from '../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage cardsCount={CARDS_COUNT}/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route
          path={AppRoute.Favorites}
          element={<PrivateRouteComponent authorizationStatus={AuthorizationStatus.NoAuth}><FavouritePage /></PrivateRouteComponent>}
        />
        <Route path={AppRoute.Offer} element={<OfferPage/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}
