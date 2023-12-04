import ReviewListComponent from './review-list';
import { makeFakeReview } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Nearby list component', () => {
  it('render correctly', () => {
    const expectedReviewsCount = 10;
    const mockReviews = Array.from({ length: 12 }, () => makeFakeReview());

    render(<ReviewListComponent reviews={mockReviews} />);

    expect(screen.getByTestId('reviews-container')).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item').length).toBe(expectedReviewsCount);
  });
});
