import { AuthorizationStatus } from '../../const';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeUserData } from '../../utils/mocks';
import HeaderComponent from './header';
import { render, screen } from '@testing-library/react';

describe('Header component', () => {
  it('render guest user component when user is not authorized', () => {
    const authMock = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: makeFakeUserData()
    };
    const { withStoreComponent } = withStore(<HeaderComponent />, { auth: authMock });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('guest')).toBeInTheDocument();
  });

  it('render logged user component when user is authorized', () => {
    const mockStore = makeFakeStore();
    const mockAuth = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: makeFakeUserData()
    };
    const { withStoreComponent } = withStore(<HeaderComponent />,
      { auth: mockAuth, offers: mockStore.offers, loading: mockStore.loading });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
