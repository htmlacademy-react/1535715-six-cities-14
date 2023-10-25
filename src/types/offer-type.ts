import Host from './host';
import HousingType from './housing-type';

type OfferType = {
  id: string;
  city: string;
  imageUrl: string;
  price: number;
  bedroomCount: number;
  maxAdults: number;
  insideStuff: string[];
  title: string;
  housingType: HousingType;
  host: Host;
  rating: number;
  isFavorite: boolean;
  isPremium: boolean;
}

export default OfferType;
