import CardComponent from './card';
import OfferType from '../types/offer-type';

type OffersListProps = {
  offers: OfferType[];
};

export default function OffersListComponent({offers}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CardComponent key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
