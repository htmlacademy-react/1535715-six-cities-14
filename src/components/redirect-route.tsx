import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';

type RedirectionProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

export default function RedirectionRoute({ children, authorizationStatus }: RedirectionProps): JSX.Element {

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Root} />
      : children
  );
}
