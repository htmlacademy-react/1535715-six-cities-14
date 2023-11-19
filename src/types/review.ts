import ReviewUser from './review-user';

type ReviewType = {
  id: number;
  date: string;
  user: ReviewUser;
  comment: string;
  rating: number;
};

export default ReviewType;
