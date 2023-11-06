import CitiesComponent from '../components/cities';
import HeaderComponent from '../components/header';
import OffersListComponent from '../components/offers-list';
import OfferType from '../types/offer-type';
import { useAppSelector } from '../hooks';

type MainPageProps = {
  offers: OfferType[];
}

export default function MainPage({offers}: MainPageProps): JSX.Element {
  const selectedCity = useAppSelector((state) => state.changeCity.city);

  const filteredOffersByCity = offers.filter((offer) => offer.city.name === selectedCity);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesComponent/>
        </div>
        <div className="cities">
          <OffersListComponent offers={filteredOffersByCity} selectedCity={selectedCity}/>
        </div>
      </main>
    </div>
  );
}
