import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import LoadingComponent from '../loading/loading';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  redirectionTo: string;
  children: JSX.Element;
}

export default function PrivateRouteComponent({ authorizationStatus, children, redirectionTo }: PrivateRouteProps): JSX.Element {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingComponent />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={redirectionTo} />
  );
}
