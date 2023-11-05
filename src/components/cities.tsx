import { Cities } from '../const';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeCitySlice } from '../store/slices/change-city-slice';

export default function CitiesComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCity = useAppSelector((state) => state.changeCity.city);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city) => (
          <li key={city} className="locations__item">
            <Link
              onClick={() => {
                dispatch(changeCitySlice.actions.changeCity(city));
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
