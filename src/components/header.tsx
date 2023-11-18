import { Link } from 'react-router-dom';
import LogoComponent from './logo';
import { AppRoute, AuthorizationStatus } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logoutAction } from '../store/api-actions';

export default function HeaderComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const isLoggedIn = authStatus === AuthorizationStatus.Auth;
  const userData = useAppSelector((state) => state.auth.userData);
  const favoriteOffersCount = useAppSelector((state) => state.offers.favoriteOffers.length);

  function signOutClickHandler() {
    dispatch(logoutAction());
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LogoComponent />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                !isLoggedIn && (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )
              }
              {
                (isLoggedIn && userData) && (
                  <>
                    <li className="header__nav-item user">
                      <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{userData.email}</span>
                        <span className="header__favorite-count">{favoriteOffersCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to='#'>
                        <span className="header__signout" onClick={signOutClickHandler}>Sign out</span>
                      </Link>
                    </li>
                  </>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
