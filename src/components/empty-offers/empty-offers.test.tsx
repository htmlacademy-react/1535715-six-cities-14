import { render, screen } from '@testing-library/react';
import EmptyOffersComponent from './empty-offers';

describe('Empty offers Component', () => {
  it('render correctly', () => {
    const city = 'Paris';
    const expectedTitle = /No places to stay available/i;
    const expectedTextWithCity = `We could not find any property available at the moment in ${city}`;

    render(<EmptyOffersComponent city={city} />);

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
    expect(screen.getByText(expectedTextWithCity)).toBeInTheDocument();
  });
});
