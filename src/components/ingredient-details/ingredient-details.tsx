import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router';
import { useSelector } from '../../services/store';
import { getIngredientById } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  let params = useParams();

  const ing = useSelector((state) => getIngredientById(state, params.id));
  console.log(ing);

  /** TODO: взять переменную из стора */
  const ingredientData = ing;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
