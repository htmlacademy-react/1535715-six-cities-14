import { useState } from 'react';
import CitiesComponent from '../components/cities';
import HeaderComponent from '../components/header';
import OffersListComponent from '../components/offers-list';
import OfferType from '../types/offer-type';

type MainPageProps = {
  offers: OfferType[];
}

export default function MainPage({offers}: MainPageProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState('Amsterdam');

  const filteredOffersByCity = offers.filter((offer) => offer.city.name === selectedCity);

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="page page--gray page--main">
      <HeaderComponent/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesComponent onCityClick={handleCityClick}/>
        </div>
        <div className="cities">
          <OffersListComponent offers={filteredOffersByCity} selectedCity={selectedCity}/>
        </div>
      </main>
    </div>
  );
}
