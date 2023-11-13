import CardComponent from './card';
import OfferType from '../types/offer-type';
import MapComponent from './map';
import SortingComponent from './sorting';
import { useState } from 'react';
import { CardPage, MAP_CITY } from '../const';
import { MapPage } from '../const';

type OffersListProps = {
  offers: OfferType[];
  selectedCity: string;
};

export default function OffersListComponent({ offers, selectedCity }: OffersListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<OfferType['id'] | null>(null);

  const handleCardMouseOver = (cardId: OfferType['id'] | null) => {
    setActiveCard(cardId);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
        <SortingComponent/>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => (
            <CardComponent
              key={offer.id}
              offer={offer}
              onCardHover={handleCardMouseOver}
              page={CardPage.MainPage}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <MapComponent
          city={MAP_CITY[selectedCity]}
          points={offers}
          selectedPoint={activeCard}
          page={MapPage.MainPage}
        />
      </div>
    </div>
  );
}
