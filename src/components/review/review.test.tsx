import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import ReviewComponent from './review';
import dayjs from 'dayjs';

describe('Review component', () => {
  it('render correctly', () => {
    const mockReview = makeFakeReview();

    render(<ReviewComponent review={mockReview} />);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(dayjs(mockReview.date).format('MMMM YYYY'))).toBeInTheDocument();
  });
});
