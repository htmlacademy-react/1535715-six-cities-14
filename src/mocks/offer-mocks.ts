import { RANDOM_MOCK_IMAGE } from '../const';
import OfferType from '../types/offer-type';

const OfferMocks: OfferType[] = [
  {
    id: 'odkasjdi',
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    images: [RANDOM_MOCK_IMAGE],
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    price: 4315,
    title: 'bla bla bla',
    type: 'Apartment',
    isFavorite: true,
    rating: 5,
    bedrooms: 2,
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, iste!',
    previewImage: RANDOM_MOCK_IMAGE,
    maxAdults: 5,
    goods: ['wifi', 'blu-ray', '4k'],
    host: {
      name: 'Anna',
      isPro: true,
      avatarUrl: 'https://i.pravatar.cc/74',
      id: 21
    }
  },
  {
    id: 'odkasjdidas',
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 12
      },
      name: 'Amsterdam'
    },
    images: [RANDOM_MOCK_IMAGE],
    isPremium: false,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    price: 411,
    title: 'another bla bla bla',
    type: 'Hotel',
    previewImage: RANDOM_MOCK_IMAGE,
    isFavorite: true,
    rating: 2,
    bedrooms: 1,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
    maxAdults: 3,
    goods: ['wifi', 'blu-ray'],
    host: {
      name: 'Carrie',
      isPro: false,
      avatarUrl: 'https://i.pravatar.cc/74',
      id: 43
    }
  },
  {
    id: 'odkasjd121i',
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    images: [RANDOM_MOCK_IMAGE],
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    price: 2222,
    title: 'again bla bla bla',
    type: 'House',
    previewImage: RANDOM_MOCK_IMAGE,
    isFavorite: true,
    rating: 3,
    bedrooms: 4,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
    maxAdults: 2,
    goods: ['wifi', 'blu-ray', '8k'],
    host: {
      name: 'John',
      isPro: true,
      avatarUrl: 'https://i.pravatar.cc/74',
      id: 46
    }
  },
  {
    id: 'odkasjdasdi',
    city: {
      location: {
        latitude: 48.864716,
        longitude: 2.349014,
        zoom: 10
      },
      name: 'Paris'
    },
    images: [RANDOM_MOCK_IMAGE],
    isPremium: true,
    location: {
      latitude: 48.864716,
      longitude: 2.379014,
      zoom: 8
    },
    price: 1111,
    title: 'alb alb alb',
    type: 'Room',
    isFavorite: false,
    rating: 4,
    previewImage: RANDOM_MOCK_IMAGE,
    bedrooms: 3,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae alias tempora reiciendis exercitationem ducimus non magnam maiores, animi magni expedita nam dicta aliquam beatae porro laudantium eligendi! Dolorem, iste aperiam.',
    maxAdults: 3,
    goods: ['wifi', 'blu-ray', 'bluetooth'],
    host: {
      name: 'Masha',
      isPro: false,
      avatarUrl: 'https://i.pravatar.cc/74',
      id: 65
    }
  }
];

export default OfferMocks;
