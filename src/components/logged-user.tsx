import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction, logoutAction } from '../store/api-actions';

export default function LoggedUserComponent() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.userData);
  const favoriteOffersCount = useAppSelector((state) => state.offers.favoriteOffers.length);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  function signOutClickHandler() {
    dispatch(logoutAction());
  }

  return (
    userData && (
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
      </>)
  );
}
