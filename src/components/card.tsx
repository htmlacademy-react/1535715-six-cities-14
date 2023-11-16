import OfferType from '../types/offer-type';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { calculateStarRating } from '../util';
import { useAppDispatch } from '../hooks';
import { getActiveCard } from '../store/slices/offers-slice';

type CardProps = {
  offer: OfferType;
  page: string;
}

export default function CardComponent({ offer, page }: CardProps): JSX.Element {
  const [favoriteStatus, setFavoriteStatus] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();

  function handleMouseEnter() {
    dispatch(getActiveCard(offer.id));
  }

  function handleMouseLeave() {
    dispatch(getActiveCard(null));
  }

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={offer.id}
      className={`${page}__card place-card`}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${page}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
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
            <span style={{ width: calculateStarRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
