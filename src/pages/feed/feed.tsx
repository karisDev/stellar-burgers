import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { getFeed } from 'src/services/feed/actions';
import { getFeedSelector } from 'src/services/feed/slice';
import { useDispatch, useSelector } from 'src/services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeedSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
