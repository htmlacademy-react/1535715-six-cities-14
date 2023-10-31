import { Link } from 'react-router-dom';
import HeaderComponent from '../components/header';
import FavoriteOfferType from '../types/favorite-offer';
import OfferType from '../types/offer-type';
import { calculateStarRating } from '../util';

type FavoriteProps = {
  offers: OfferType[];
}

export default function FavouritePage({ offers }: FavoriteProps): JSX.Element {

  const favoriteOffersList = offers.reduce<FavoriteOfferType>((accumulator, currentOffer) => {
    if (currentOffer.isFavorite) {
      const existingCity = accumulator.find((item) => item.city === currentOffer.city.name);

      if (existingCity) {
        existingCity.favoriteOffers.push(currentOffer);
      } else {
        accumulator.push({
          city: currentOffer.city.name,
          favoriteOffers: [currentOffer],
        });
      }
    }
    return accumulator;
  }, []);

  return (
    <div className="page">
      <HeaderComponent />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteOffersList.map(({ city, favoriteOffers }) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.map((offer) => (
                      <article className="favorites__card place-card" key={offer.id}>
                        {offer.isPremium &&
                        <div className="place-card__mark">
                          <span>Premium</span>
                        </div>}
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <a href="#">
                            <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
                          </a>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">
                                &euro;{offer.price}
                              </b>
                              <span className="place-card__price-text">
                                &#47;&nbsp;night
                              </span>
                            </div>
                            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{width: `${calculateStarRating(offer.rating)}%`}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
                          </h2>
                          <p className="place-card__type">{offer.type}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
