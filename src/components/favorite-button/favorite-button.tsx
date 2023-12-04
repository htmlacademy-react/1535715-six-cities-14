import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { changeFavoriteStatus } from '../../store/api-actions';

type FavoriteButtonProps = {
  isFavorite: boolean;
  offerId: string;
  width?: number;
  height?: number;
  page?: 'place-card' | 'offer';
}

export default function FavoriteButtonComponent({ isFavorite, width = 18, height = 19, page = 'place-card', offerId }: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.authorizationStatus) === AuthorizationStatus.Auth;
  const [isOn, setOn] = useState(isFavorite);
  const isActive = isAuth && isOn;
  const navigate = useNavigate();

  function handleClick() {
    if (!isAuth) {
      navigate(AppRoute.Login);
    }

    const favoriteData = {
      offerId,
      status: Number(!isOn)
    };

    dispatch(changeFavoriteStatus(favoriteData));
    setOn(!isOn);
  }

  return (
    <button
      onClick={handleClick}
      className={classNames(
        `${page}__bookmark-button button`,
        { [`${page}__bookmark-button--active`]: isActive }
      )}
      type="button"
    >
      <svg className={`${page}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
