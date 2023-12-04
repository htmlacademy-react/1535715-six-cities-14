import { Cities } from '../../const';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/slices/offers-slice/offers-slice';
import { memo } from 'react';

function CitiesComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCity = useAppSelector((state) => state.offers.city);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city) => (
          <li key={city} className="locations__item">
            <Link
              onClick={() => {
                dispatch(changeCity(city));
              }}
              className={classnames(
                'locations__item-link',
                'tabs__item',
                { 'tabs__item--active': city === stateCity }
              )} to="#"
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const CitiesComponentMemo = memo(CitiesComponent);
export default CitiesComponentMemo;
