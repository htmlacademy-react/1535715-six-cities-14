import OfferType from '../../types/offer-type';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { calculateStarRating } from '../../utils/util';
import { useAppDispatch } from '../../hooks';
import { getActiveCard } from '../../store/slices/offers-slice/offers-slice';
import FavoriteButtonComponent from '../favorite-button/favorite-button';
import { memo } from 'react';

type CardProps = {
  offer: OfferType;
  page: string;
}

function CardComponent({ offer, page }: CardProps): JSX.Element {
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
          <FavoriteButtonComponent isFavorite={offer.isFavorite} offerId={offer.id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateStarRating(offer.rating)}%` }}></span>
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

const OfferCardMemo = memo(CardComponent);
export default OfferCardMemo;
