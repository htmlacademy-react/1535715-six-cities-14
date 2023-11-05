import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import OfferMocks from './mocks/offer-mocks';
import ReviewMocks from './mocks/review-mocks';
import { store } from './store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={OfferMocks} reviews={ReviewMocks}/>
    </Provider>
  </React.StrictMode>
);
