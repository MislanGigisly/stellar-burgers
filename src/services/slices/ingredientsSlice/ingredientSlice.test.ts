import ingredientsReducer, {
  initialState,
  getIngredientsThunk
} from './ingredientsSlice';

describe('ingredientSlice', () => {
  const ingredient_1 = {
    _id: '2',
    name: 'Биокотлета',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'ttps://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const ingredient_2 = {
    _id: '4',
    name: 'Соус',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };
  const ingredientsList = [ingredient_1, ingredient_2];

  it('Проветка изначального состояния', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('Попытка вызова ингредиента', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
    expect(state.data).toEqual([]);
  });

  it('Ошибка при вызове ингредиента', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Error fetching ingredients' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error fetching ingredients');
    expect(state.data).toEqual([]);
  });

  it('Ингредиент получен', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredientsList
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.data).toEqual(ingredientsList);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });
});
