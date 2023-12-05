import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRouteComponent from './private-route';
import { render, screen } from '@testing-library/react';

describe('Private route component', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('render public route when user is not authorized', () => {
    const expectedText = 'Public route';
    const notExpectedText = 'Private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRouteComponent authorizationStatus={AuthorizationStatus.NoAuth} redirectionTo={AppRoute.Login}>
            <span>{notExpectedText}</span>
          </PrivateRouteComponent>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('render private page when user is authorized', () => {
    const expectedText = 'Private route';
    const notExpectedText = 'Public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRouteComponent authorizationStatus={AuthorizationStatus.Auth} redirectionTo={AppRoute.Login}>
            <span>{expectedText}</span>
          </PrivateRouteComponent>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
