import { withStore } from '../../utils/mock-component';
import ReviewFormComponent from './review-form';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Nearby list component', () => {
  it('render correctly', () => {
    const expectedStarsCount = 5;
    const initialState = makeFakeStore();
    const { withStoreComponent: preparedComponent } = withStore(<ReviewFormComponent />, { auth: initialState.auth });

    render(preparedComponent);

    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getAllByTestId('star-item').length).toBe(expectedStarsCount);
  });
});
