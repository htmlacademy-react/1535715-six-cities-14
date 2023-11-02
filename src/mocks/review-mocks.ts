import Review from '../types/review';
import { RANDOM_REVIEW_IMAGE } from '../const';

const ReviewMocks: Review[] = [
  {
    id: 1,
    user: {
      avatarUrl: RANDOM_REVIEW_IMAGE,
      id: 101,
      isPro: true,
      name: 'John Doe',
    },
    rating: 4.5,
    comment: 'Great food and service!',
    date: '2023-10-15',
  },
  {
    id: 2,
    user: {
      avatarUrl: RANDOM_REVIEW_IMAGE,
      id: 102,
      isPro: false,
      name: 'Jane Smith',
    },
    rating: 3.0,
    comment: 'Average experience.',
    date: '2023-10-14',
  },
  {
    id: 3,
    user: {
      avatarUrl: RANDOM_REVIEW_IMAGE,
      id: 103,
      isPro: false,
      name: 'Ann Jan',
    },
    rating: 3.0,
    comment: 'Just common.',
    date: '2023-10-14',
  },
  {
    id: 101,
    user: {
      avatarUrl: RANDOM_REVIEW_IMAGE,
      id: 1001,
      isPro: true,
      name: 'Laura Clark',
    },
    rating: 4.5,
    comment: 'I visited this restaurant last weekend, and I must say it was a delightful experience. The food was excellent, and the service was top-notch. I highly recommend it!',
    date: '2023-11-15',
  },
  {
    id: 143,
    user: {
      avatarUrl: RANDOM_REVIEW_IMAGE,
      id: 1002,
      isPro: false,
      name: 'Alice Johnson',
    },
    rating: 3.8,
    comment: 'The restaurant was decent, but I expected better. The service was a bit slow, and the portions were small for the price.',
    date: '2023-11-14',
  },
];

export default ReviewMocks;
