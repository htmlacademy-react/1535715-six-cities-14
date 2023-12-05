import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import RedirectionRoute from './redirect-route';
import { render, screen } from '@testing-library/react';

describe('Redirect route component', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });

  it('normally route to login page when user is not authorized', () => {
    const expectedText = 'Root';
    const notExpectedText = 'Login';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <RedirectionRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{expectedText}</span>
          </RedirectionRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('redirect back when user is authorized', () => {
    const expectedText = 'Root';
    const notExpectedText = 'Login';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Root} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <RedirectionRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{notExpectedText}</span>
          </RedirectionRoute>
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
