import { withStore, withHistory } from '../../utils/mock-component';
import { CardComponent } from './card';
import { makeFakeOffer, makeFakeUserData } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';

describe('Card component', () => {
  it('render correctly', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: makeFakeUserData()
    };
    const { withStoreComponent } = withStore(
      <CardComponent offer={mockOffer} page='cities' />, { auth: initialState });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});
