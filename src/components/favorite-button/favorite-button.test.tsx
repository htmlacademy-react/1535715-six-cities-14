import { withHistory, withStore } from '../../utils/mock-component';
import FavoriteButtonComponent from './favorite-button';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Favorite button component', () => {
  it('render correctly', () => {
    const initialState = makeFakeStore();
    const { withStoreComponent } = withStore(
      <FavoriteButtonComponent isFavorite offerId={crypto.randomUUID()} />,
      { auth: initialState.auth });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
  });
});
