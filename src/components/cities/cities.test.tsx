import { withStore, withHistory } from '../../utils/mock-component';
import { CitiesComponent } from './cities';
import { makeFakeStore } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

describe('Cities component', () => {
  it('render correctly', () => {
    const expectedCitiesCount = 6;
    const initialState = makeFakeStore().offers;
    const { withStoreComponent } = withStore(<CitiesComponent />, { offers: initialState });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('cities-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('city-item').length).toBe(expectedCitiesCount);
  });
});
