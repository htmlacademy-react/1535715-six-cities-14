import { render, screen } from '@testing-library/react';
import LogoComponent from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Logo Component', () => {
  it('render correctly', () => {
    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<LogoComponent />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
