import HeaderComponent from '../components/header';
import FavoriteEmptyComponent from '../components/favorite-empty';
import FavoriteOfferType from '../types/favorite-offer';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { calculateStarRating } from '../util';
import { useAppSelector } from '../hooks';
import FavoriteButtonComponent from '../components/favorite-button';

export default function FavouritePage(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers);

  const favoriteOffersList = favoriteOffers.reduce<FavoriteOfferType>((accumulator, currentOffer) => {
    if (currentOffer.isFavorite) {
      const existingCity = accumulator.find((item) => item.city === currentOffer.city.name);

      if (existingCity) {
        existingCity.cityFavoriteOffers.push(currentOffer);
      } else {
        accumulator.push({
          city: currentOffer.city.name,
          cityFavoriteOffers: [currentOffer],
        });
      }
    }
    return accumulator;
  }, []);

  return (
    <div className={classNames(
      'page',
      { 'page--favorites-empty': !favoriteOffers.length }
    )}
    >
      <HeaderComponent />

      <main className={classNames(
        'page__main',
        'page__main--favorites',
        { 'page__main--favorites-empty': !favoriteOffers.length }
      )}
      >
        <div className="page__favorites-container container">
          {(!favoriteOffers.length && favoriteOffers) && <FavoriteEmptyComponent />}

          {favoriteOffers.length > 0 &&
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favoriteOffersList.map(({ city, cityFavoriteOffers }) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityFavoriteOffers.map((offer) => (
                        <article className="favorites__card place-card" key={offer.id}>
                          {offer.isPremium &&
                            <div className="place-card__mark">
                              <span>Premium</span>
                            </div>}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <a href="#">
                              <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
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
                              <FavoriteButtonComponent isFavorite={offer.isFavorite} offerId={offer.id} />
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{ width: `${calculateStarRating(offer.rating)}%` }}></span>
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
            </section>}
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
