import { withStore, withHistory } from '../../utils/mock-component';
import OffersListComponent from './offers-list';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { Cities } from '../../const';

describe('Card component', () => {
  it('render correctly', () => {
    const expectedCardsCount = 4;
    const mockOffers = Array.from({ length: 4 }, () => makeFakeOffer());
    const initialState = makeFakeStore();
    const { withStoreComponent } = withStore(
      <OffersListComponent offers={mockOffers} selectedCity={Cities[0]} />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getAllByTestId('card-item').length).toBe(expectedCardsCount);
  });
});
