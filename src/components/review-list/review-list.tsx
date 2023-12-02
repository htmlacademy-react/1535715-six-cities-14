import { MAX_REVIEWS_COUNT } from '../../const';
import ReviewType from '../../types/review';
import ReviewComponent from '../review/review';

type ReviewListProps = {
  reviews: ReviewType[];
}

export default function ReviewListComponent({ reviews }: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list" data-testid="reviews-container">
      {reviews.map((review) => <ReviewComponent key={review.id} review={review} data-testid="review-item" />).slice(0, MAX_REVIEWS_COUNT)}
    </ul>
  );
}
