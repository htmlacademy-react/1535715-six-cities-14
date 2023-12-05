import { SortingComponent } from './sorting';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';

describe('Nearby list component', () => {
  it('render correctly', () => {
    const expectedSortsCount = 4;
    const { withStoreComponent: preparedComponent } = withStore(<SortingComponent />);

    render(preparedComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByTestId('sort-item').length).toBe(expectedSortsCount);
  });
});
