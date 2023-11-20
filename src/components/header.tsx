import LogoComponent from './logo';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';
import GuestUserComponent from './guest-user';
import LoggedUserComponent from './logged-user';

export default function HeaderComponent(): JSX.Element {
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const isLoggedIn = authStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LogoComponent />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                !isLoggedIn && (
                  <GuestUserComponent />
                )
              }
              {
                isLoggedIn && (
                  <LoggedUserComponent />
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
