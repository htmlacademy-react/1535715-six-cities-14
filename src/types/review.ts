import ReviewUser from './review-user';

type ReviewType = {
  id: number;
  user: ReviewUser;
  rating: number;
  comment: string;
  date: string;
}

export default ReviewType;
