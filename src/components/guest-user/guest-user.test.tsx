import { withStore, withHistory } from '../../utils/mock-component';
import GuestUserComponent from './guest-user';
import { render, screen } from '@testing-library/react';

describe('Guest user component', () => {
  it('render correctly', () => {
    const { withStoreComponent } = withStore(<GuestUserComponent />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
