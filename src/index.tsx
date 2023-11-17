import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import ReviewMocks from './mocks/review-mocks';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import ErrorComponent from './components/error';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorComponent />
      <App reviews={ReviewMocks} />
    </Provider>
  </React.StrictMode>
);
