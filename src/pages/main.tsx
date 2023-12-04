import CitiesComponent from '../components/cities/cities';
import HeaderComponent from '../components/header/header';
import LoadingComponent from '../components/loading/loading';
import OffersListComponent from '../components/offers-list/offers-list';
import EmptyOffersComponent from '../components/empty-offers/empty-offers';
import classNames from 'classnames';
import { useAppSelector } from '../hooks';
import { sortingCards } from '../utils/util';
import { RequestStatus } from '../const';

export default function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.offers.city);
  const cardsSortingType = useAppSelector((state) => state.offers.sortingType);
  const allOffers = useAppSelector((state) => state.offers.offers);
  // const isOffersLoaded = useAppSelector((state) => state.loading.offersFetchingStatus)
  //   === RequestStatus.Success;
  const isOffersLoading = useAppSelector((state) => state.loading.offersFetchingStatus);

  const filteredOffersByCity = allOffers.filter((offer) => offer.city.name === selectedCity);
  const sortedOffers = sortingCards[cardsSortingType](filteredOffersByCity);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent />

      <main className={classNames(
        'page__main page__main--index',
        { 'page__main--index-empty': !isOffersLoading && !filteredOffersByCity.length }
      )}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesComponent />
        </div>
        <div className="cities">
          {isOffersLoading && <LoadingComponent />}
          {(!isOffersLoading && !filteredOffersByCity.length) && <EmptyOffersComponent city={selectedCity} />}
          {(!isOffersLoading && !!filteredOffersByCity.length) && <OffersListComponent offers={sortedOffers} selectedCity={selectedCity} />}
        </div>
      </main>
    </div>
  );
}
