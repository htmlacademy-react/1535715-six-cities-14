import CitiesComponent from '../components/cities';
import HeaderComponent from '../components/header';
import OffersListComponent from '../components/offers-list';
import OfferType from '../types/offer-type';
import { useAppSelector } from '../hooks';
import { sortingCards } from '../util';

type MainPageProps = {
  offers: OfferType[];
}

export default function MainPage({offers}: MainPageProps): JSX.Element {
  const selectedCity = useAppSelector((state) => state.offers.city);
  const cardsSortingType = useAppSelector((state) => state.offers.sortingType);


  const filteredOffersByCity = offers.filter((offer) => offer.city.name === selectedCity);
  const sortedOffers = sortingCards[cardsSortingType](filteredOffersByCity);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesComponent/>
        </div>
        <div className="cities">
          <OffersListComponent offers={sortedOffers} selectedCity={selectedCity}/>
        </div>
      </main>
    </div>
  );
}
