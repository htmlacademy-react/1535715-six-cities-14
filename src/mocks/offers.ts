import { RANDOM_HOST_IMAGE, RANDOM_MOCK_IMAGE } from '../const';
import OfferType from '../types/offer-type';

const Offers: OfferType[] = [
  {
    id: 'odkasjdi',
    city: 'Amsterdam',
    imageUrl: RANDOM_MOCK_IMAGE,
    isPremium: true,
    price: 4315,
    title: 'bla bla bla',
    housingType: 'Apartment',
    isFavorite: true,
    rating: 5,
    bedroomCount: 2,
    maxAdults: 5,
    insideStuff: ['wifi', 'blu-ray', '4k'],
    host: {
      name: 'Anna',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
      isPro: true,
      imageUrl: 'https://i.pravatar.cc/74'
    }
  },
  {
    id: 'odkasjdidas',
    city: 'Amsterdam',
    imageUrl: RANDOM_MOCK_IMAGE,
    isPremium: false,
    price: 411,
    title: 'another bla bla bla',
    housingType: 'Hotel',
    isFavorite: true,
    rating: 2,
    bedroomCount: 1,
    maxAdults: 3,
    insideStuff: ['wifi', 'blu-ray'],
    host: {
      name: 'Carrie',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
      isPro: false,
      imageUrl: 'https://i.pravatar.cc/74'
    }
  },
  {
    id: 'odkasjd121i',
    city: 'Cologne',
    imageUrl: RANDOM_MOCK_IMAGE,
    isPremium: false,
    price: 2222,
    title: 'again bla bla bla',
    housingType: 'House',
    isFavorite: true,
    rating: 3,
    bedroomCount: 4,
    maxAdults: 2,
    insideStuff: ['wifi', 'blu-ray', '8k'],
    host: {
      name: 'John',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
      isPro: true,
      imageUrl: 'https://i.pravatar.cc/74'
    }
  },
  {
    id: 'odkasjdasdi',
    city: 'Rotterdam',
    imageUrl: RANDOM_MOCK_IMAGE,
    isPremium: true,
    price: 1111,
    title: 'alb alb alb',
    housingType: 'Room',
    isFavorite: false,
    rating: 4,
    bedroomCount: 3,
    maxAdults: 3,
    insideStuff: ['wifi', 'blu-ray', 'bluetooth'],
    host: {
      name: 'Masha',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
      isPro: false,
      imageUrl: 'https://i.pravatar.cc/74'
    }
  }
];

export default Offers;
