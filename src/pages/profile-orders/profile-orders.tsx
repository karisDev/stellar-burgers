import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed } from 'src/services/feed/actions';
import { getOrders } from 'src/services/order/actions';
import { getOrdersSelector } from 'src/services/order/slice';
import { useDispatch, useSelector } from 'src/services/store';
import {
  getIsAuthCheckedSelector,
  getUserSelector
} from 'src/services/user/slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);

  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    if (!isAuthChecked || !user) return;

    dispatch(getFeed());
    dispatch(getOrders());
  }, [isAuthChecked, user]);

  return <ProfileOrdersUI orders={orders} />;
};
