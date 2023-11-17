import Host from './host';
import OfferType from './offer-type';

type FullOfferType = Omit<OfferType, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

export default FullOfferType;
