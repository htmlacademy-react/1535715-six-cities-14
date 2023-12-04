import OfferType from '../../types/offer-type';
import CardComponent from '../card/card';
import { CardPage } from '../../const';

type NearbyListProps = {
  nearbyOffers: OfferType[];
}

export default function NearbyListComponent({ nearbyOffers }: NearbyListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearbyOffers.map((offer) => (
          <CardComponent key={offer.id} offer={offer} page={CardPage.OfferPage} />
        ))}
      </div>
    </section>
  );
}
