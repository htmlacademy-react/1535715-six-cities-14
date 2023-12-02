import { render, screen } from '@testing-library/react';
import LoadingComponent from './loading';

describe('Loading Component', () => {
  it('render correctly', () => {
    const expectedText = /Loading/i;

    render(<LoadingComponent />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
