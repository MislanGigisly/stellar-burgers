import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  changePositionIngredients,
  removeIngredient
} from '../../services/slices/constractorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(changePositionIngredients({ from: index, to: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(changePositionIngredients({ from: index, to: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.key));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
