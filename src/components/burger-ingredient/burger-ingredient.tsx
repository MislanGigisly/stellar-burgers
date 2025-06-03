import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { addBun, addIngredient } from '../../services/slices/constractorSlice';
import { useDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const disp = useDispatch();

    const handleAdd = () => {
      ingredient.type == 'bun'
        ? disp(addBun(ingredient))
        : disp(addIngredient(ingredient));
    }; // добавление ингридиентов и булок в список конструктора

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
