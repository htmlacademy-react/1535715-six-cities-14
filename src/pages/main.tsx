import CitiesComponent from '../components/cities';
import HeaderComponent from '../components/header';
import LoadingComponent from '../components/loading';
import OffersListComponent from '../components/offers-list';
import { useAppSelector } from '../hooks';
import { sortingCards } from '../util';
import { RequestStatus } from '../const';

export default function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.offers.city);
  const cardsSortingType = useAppSelector((state) => state.offers.sortingType);
  const allOffers = useAppSelector((state) => state.offers.offers);
  const fecthingOffersStatus = useAppSelector((state) => state.loading.offersFetchingStatus);

  const filteredOffersByCity = allOffers.filter((offer) => offer.city.name === selectedCity);
  const sortedOffers = sortingCards[cardsSortingType](filteredOffersByCity);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesComponent />
        </div>
        <div className="cities">
          {fecthingOffersStatus === RequestStatus.Pending && <LoadingComponent />}
          {fecthingOffersStatus === RequestStatus.Success && <OffersListComponent offers={sortedOffers} selectedCity={selectedCity} />}
        </div>
      </main>
    </div>
  );
}
