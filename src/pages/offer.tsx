import HeaderComponent from '../components/header/header';
import ReviewFormComponent from '../components/review-form/review-form';
import ReviewListComponent from '../components/review-list/review-list';
import MapComponent from '../components/map/map';
import { calculateStarRating } from '../utils/util';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, MAX_NEARPLACES_COUNT, MAX_OFFER_IMAGES, MapPage, RequestStatus } from '../const';
import NearbyListComponent from '../components/nearby-list/nearby-list';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { fetchNearPlaces, fetchOfferAction, fetchOfferReviewsAction } from '../store/api-actions';
import LoadingComponent from '../components/loading/loading';
import { dropCertainOffer } from '../store/slices/offers-slice/offers-slice';
import dayjs from 'dayjs';
import FavoriteButtonComponent from '../components/favorite-button/favorite-button';
import { setOfferFetchingStatus } from '../store/slices/loading-slice/loading-slice';

export default function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offerId = String(useParams().offerId);
  const selectedOffer = useAppSelector((state) => state.offers.certainOffer);
  const offerReviews = useAppSelector((state) => state.offers.certainOfferReviews);
  const nearbyOffers = useAppSelector((state) => state.offers.nearPlaces)
    ?.slice(0, MAX_NEARPLACES_COUNT);
  const isLoggedIn = useAppSelector((state) => state.auth.authorizationStatus)
    === AuthorizationStatus.Auth;
  const fetchingOfferStatus = useAppSelector((state) => state.loading.offerFetchingStatus);

  const sortedOfferReviews = offerReviews?.slice()?.sort((a, b) => {
    const dateA = dayjs(a.date);
    const dateB = dayjs(b.date);

    return dateB.diff(dateA);
  });

  useEffect(() => {
    if (!offerId) {
      return;
    }

    dispatch(fetchOfferAction(offerId));
    dispatch(fetchNearPlaces(offerId));
    dispatch(fetchOfferReviewsAction(offerId));

    return () => {
      dispatch(dropCertainOffer());
      dispatch(setOfferFetchingStatus(RequestStatus.Idle));
    };
  }, [offerId, dispatch]);

  if (fetchingOfferStatus === RequestStatus.Error) {
    navigate(AppRoute.Error);
  }

  return (
    <div className="page">
      <HeaderComponent />

      {(!selectedOffer || !nearbyOffers || !offerReviews) && <LoadingComponent />}

      {(selectedOffer && nearbyOffers) &&
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {selectedOffer.images.slice(0, MAX_OFFER_IMAGES).map((image) => (
                  <div key={image} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {selectedOffer.isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {selectedOffer.title}
                  </h1>
                  <FavoriteButtonComponent isFavorite={selectedOffer.isFavorite} page='offer' width={31} height={33} offerId={offerId} />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${calculateStarRating(selectedOffer.rating)}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{selectedOffer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {selectedOffer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {`${selectedOffer.bedrooms} Bedroom${selectedOffer.bedrooms > 1 ? 's' : ''}`}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    {`Max ${selectedOffer.maxAdults} adult${selectedOffer.maxAdults > 1 ? 's' : ''}`}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{selectedOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {selectedOffer.goods.map((stuff) => (
                      <li className="offer__inside-item" key={stuff}>
                        {stuff}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${selectedOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                      <img className="offer__avatar user__avatar" src={selectedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {selectedOffer.host.name}
                    </span>
                    {selectedOffer.host.isPro && (
                      <span className="offer__user-status">
                        Pro
                      </span>)}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {selectedOffer.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews?.length}</span></h2>
                  {(sortedOfferReviews?.length > 0 && sortedOfferReviews) && <ReviewListComponent reviews={sortedOfferReviews} />}
                  {isLoggedIn && <ReviewFormComponent />}
                </section>
              </div>
            </div>
            <section className="offer__map map">
              <MapComponent
                city={selectedOffer.city}
                points={[selectedOffer, ...nearbyOffers]}
                page={MapPage.OfferPage}
                selectedPoint={selectedOffer.id}
              />
            </section>
          </section>
          <div className="container">
            <NearbyListComponent nearbyOffers={nearbyOffers} />
          </div>
        </main>}
    </div>
  );
}
