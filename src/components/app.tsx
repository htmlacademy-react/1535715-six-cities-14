import MainPage from '../pages/main';
import LoginPage from '../pages/login';
import FavouritePage from '../pages/favourite';
import OfferPage from '../pages/offer';
import Error from '../pages/error';
import PrivateRouteComponent from './private-route';
import OfferType from '../types/offer-type';
import { AppRoute, AuthorizationStatus } from '../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewType from '../types/review';

type AppProps = {
  offers: OfferType[];
  reviews: ReviewType[];
}

export default function App({offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage offers={offers}/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route
          path={AppRoute.Favorites}
          element={<PrivateRouteComponent authorizationStatus={AuthorizationStatus.Auth}><FavouritePage offers={offers}/></PrivateRouteComponent>}
        />
        <Route path={AppRoute.OfferId} element={<OfferPage offers={offers} reviews={reviews}/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}
