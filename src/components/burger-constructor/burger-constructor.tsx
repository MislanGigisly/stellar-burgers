import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  orderLoadingSelector,
  orderItemSelector,
  resetOrderItem,
  orderBurger
} from '../../services/slices/orderSlice';
import {
  getConstructorItems,
  resetConstructor
} from '../../services/slices/constractorSlice';
import { isAuthSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();

  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(orderLoadingSelector); //TO DO

  const orderModalData = useSelector(orderItemSelector); //TO DO

  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const orderData = !constructorItems.bun
      ? ['']
      : [
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id),
          constructorItems.bun._id
        ];

    dispatch(orderBurger(orderData));
  };
  const closeOrderModal = () => {
    dispatch(resetOrderItem());
    dispatch(resetConstructor());
  }; // to do

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0),
    [constructorItems]
  );

  //return null;

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
