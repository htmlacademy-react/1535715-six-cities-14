import OfferType from '../types/offer-type';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

type CardProps = {
  offer: OfferType;
  handleCardMouseOver: (id: string) => void;
}

export default function CardComponent({offer, handleCardMouseOver}: CardProps): JSX.Element {

  const [favoriteStatus, setFavoriteStatus] = useState(offer.isFavorite);

  const cardMouseOverHandler = () => {
    handleCardMouseOver(offer.id);
  };

  return (
    <article onMouseEnter={cardMouseOverHandler} id={offer.id} className="cities__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.imageUrl} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={() => setFavoriteStatus((prevStatus) => !prevStatus)}
            className={`place-card__bookmark-button button ${favoriteStatus ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80px'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.housingType}</p>
      </div>
    </article>
  );
}
