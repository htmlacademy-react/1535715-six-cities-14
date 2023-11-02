import { useState } from 'react';
import { Cities } from '../const';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

type CitiesProps = {
  onCityClick: (city: string) => void;
}

export default function CitiesComponent({onCityClick}: CitiesProps): JSX.Element {
  const [stateCity, setStateCity] = useState('Amsterdam');

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city) => (
          <li key={city} className="locations__item">
            <Link
              onClick={() => {
                setStateCity(city);
                onCityClick(city);
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
