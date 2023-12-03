import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { withStore } from '../../utils/mock-component';
import App from './app';
import { makeFakeStore } from '../../utils/mocks';

describe('Application routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('render "MainPage" when user navigates to "/"', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
});
