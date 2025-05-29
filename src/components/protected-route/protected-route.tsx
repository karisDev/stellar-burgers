import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from 'src/services/store';
import {
  getIsAuthCheckedSelector,
  getUserSelector
} from 'src/services/user/slice';

type ProtectedRouteProps = {
  component: React.ReactElement;
  requireAuth?: boolean;
};

const ProtectedRoute = ({
  component,
  requireAuth
}: ProtectedRouteProps): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;

  if (requireAuth && !user)
    return <Navigate to='/login' state={{ from: location }} />;

  if (!requireAuth && user)
    return <Navigate to={location.state?.from ?? '/'} />;

  return component;
};

export const AuthRequiredRoute = (props: { component: React.ReactElement }) => (
  <ProtectedRoute requireAuth {...props} />
);

export const AuthForbiddenRoute = (props: {
  component: React.ReactElement;
}) => <ProtectedRoute {...props} />;
