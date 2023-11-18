import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  redirectionTo: string;
  children: JSX.Element;
}

export default function PrivateRouteComponent({ authorizationStatus, children, redirectionTo }: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={redirectionTo} />
  );
}
