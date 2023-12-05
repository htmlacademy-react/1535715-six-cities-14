import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import LoggedUserComponent from './logged-user';
import { render, screen } from '@testing-library/react';

describe('Logged user component', () => {
  it('render correctly', () => {
    const mockStore = makeFakeStore();
    const mockUserData = mockStore.auth.userData;
    const { withStoreComponent } = withStore(<LoggedUserComponent />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(mockUserData!.email)).toBeInTheDocument();
    expect(screen.getByText(mockStore.offers.favoriteOffers.length)).toBeInTheDocument();
  });
});
