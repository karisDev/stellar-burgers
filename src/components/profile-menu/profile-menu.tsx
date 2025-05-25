import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'src/services/store';
import { logout } from 'src/services/user/actions';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => dispatch(logout());

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
