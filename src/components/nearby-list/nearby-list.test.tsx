import { withStore, withHistory } from '../../utils/mock-component';
import NearbyListComponent from './nearby-list';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Nearby list component', () => {
  it('render correctly', () => {
    const expectedCardsCount = 3;
    const mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
    const initialState = makeFakeStore();
    const { withStoreComponent } = withStore(<NearbyListComponent nearbyOffers={mockOffers} />, { auth: initialState.auth });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item').length).toBe(expectedCardsCount);
  });
});
