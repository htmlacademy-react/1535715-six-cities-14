import ReviewType from '../types/review';
import dayjs from 'dayjs';
import { calculateStarRating } from '../util';

type ReviewProps = {
  review: ReviewType;
}

export default function ReviewComponent({ review }: ReviewProps): JSX.Element {
  const formatedDate = dayjs(review.date).format('MMMM YYYY');
  const attributeFormatedDate = dayjs(review.date).format('YYYY-M-D');

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${calculateStarRating(review.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={attributeFormatedDate}>{formatedDate}</time>
      </div>
    </li>
  );
}
