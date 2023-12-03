import CardComponent from '../card/card';
import OfferType from '../../types/offer-type';
import MapComponent from '../map/map';
import SortingComponent from '../sorting/sorting';
import { CardPage, MAP_CITY } from '../../const';
import { MapPage } from '../../const';
import { useAppSelector } from '../../hooks';

type OffersListProps = {
  offers: OfferType[];
  selectedCity: string;
};

export default function OffersListComponent({ offers, selectedCity }: OffersListProps): JSX.Element {
  const selectedPoint = useAppSelector((state) => state.offers.activeCard);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`${offers.length} place${offers.length === 1 ? '' : 's'} to stay in ${selectedCity}`}</b>
        <SortingComponent />
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => (
            <CardComponent
              key={offer.id}
              offer={offer}
              page={CardPage.MainPage}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <MapComponent
          city={MAP_CITY[selectedCity]}
          points={offers}
          page={MapPage.MainPage}
          selectedPoint={selectedPoint}
        />
      </div>
    </div>
  );
}
