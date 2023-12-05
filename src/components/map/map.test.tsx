import { MapPage } from '../../const';
import { withStore } from '../../utils/mock-component';
import { makeFakeOffer } from '../../utils/mocks';
import MapComponent from './map';
import { render, screen } from '@testing-library/react';

describe('Header component', () => {
  it('render guest user component when user is not authorized', () => {
    const mockOffers = Array.from({ length: 3 }, () => makeFakeOffer());
    const { withStoreComponent: preparedComponent } = withStore(<MapComponent city={mockOffers[0].city} page={MapPage.MainPage} points={mockOffers} selectedPoint={mockOffers[0].id} />, {});

    render(preparedComponent);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
