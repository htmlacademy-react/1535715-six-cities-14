import { AuthorizationStatus } from '../../../const';
import { UserData } from '../../../types/user-data';
import { makeFakeUserData } from '../../../utils/mocks';
import { authSlice, requireAuthorization, setUserData } from './auth-slice';

describe('Auth slice testing', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null as null | UserData,
  };

  it('set auth status', () => {
    const result = authSlice.reducer(
      initialState,
      requireAuthorization(AuthorizationStatus.Auth)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('set user data', () => {
    const mockUserData = makeFakeUserData();

    const result = authSlice.reducer(initialState, setUserData(mockUserData));

    expect(result.userData).toBe(mockUserData);
  });
});
