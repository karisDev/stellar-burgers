import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'src/services/store';
import {
  clearOrderModal,
  getConstructorSelector,
  getOrderModalDataSelector,
  getOrderRequestSelector,
  resetIngredients
} from 'src/services/burger-constructor/slice';
import { getUserSelector } from 'src/services/user/slice';
import { orderBurger } from 'src/services/burger-constructor/actions';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderModalDataSelector);
  const user = useSelector(getUserSelector);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredientsIds)).then(() =>
      dispatch(resetIngredients())
    );
  };

  const closeOrderModal = () => dispatch(clearOrderModal());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
