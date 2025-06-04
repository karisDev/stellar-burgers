import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from 'src/services/store';
import { useParams } from 'react-router-dom';
import { getIngredientsSelector } from 'src/services/ingredients/slice';
import { getOrderByNumber } from 'src/services/order/actions';
import { getOrderByNumberSelector, clearOrder } from 'src/services/order/slice';
import { Modal } from '../modal';

import styles from './order-info.module.css';

export const OrderInfo: FC<{ asModal?: boolean }> = ({ asModal }) => {
  const { number } = useParams();

  const dispatch = useDispatch();
  const orderData = useSelector(getOrderByNumberSelector);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  useEffect(() => {
    if (number) {
      dispatch(getOrderByNumber(Number(number)));
      dispatch(clearOrder());
    }
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  const Wrapper = asModal ? Modal : 'div';

  if (!orderInfo) {
    return <Preloader />;
  }

  if (asModal) {
    return (
      <Modal title={`#${orderInfo.number.toString()}`}>
        <OrderInfoUI orderInfo={orderInfo} />
      </Modal>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>#{orderInfo.number.toString()}</h2>
      <OrderInfoUI orderInfo={orderInfo} />
    </div>
  );
};
