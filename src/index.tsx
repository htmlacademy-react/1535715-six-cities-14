import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import OfferMocks from './mocks/offer-mocks';
import ReviewMocks from './mocks/review-mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OfferMocks} reviews={ReviewMocks}/>
  </React.StrictMode>
);
