import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { setFavoriteOffers } from '../store/slices/offers-slice';

export default function GuestUserComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavoriteOffers([]));
  }, [dispatch]);

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );
}
