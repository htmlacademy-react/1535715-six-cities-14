import { render, screen } from '@testing-library/react';
import FavoriteEmptyComponent from './favorite-empty';

describe('Favorite empty Component', () => {
  it('render correctly', () => {
    const expectedTitle = /Nothing yet saved./i;
    const expectedText = /Save properties to narrow down search or plan your future trips\./i;

    render(<FavoriteEmptyComponent />);

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
