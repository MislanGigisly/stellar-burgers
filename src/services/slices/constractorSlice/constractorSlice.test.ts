import constructorSliceReducer, {
  addIngredient,
  removeIngredient,
  changePositionIngredients,
  resetConstructor,
  initialState,
  addBun
} from './constractorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RightSideOFMainInterface } from './constractorSlice';

describe('constructorSlice', () => {
  const ingredient_1: TConstructorIngredient = {
    _id: '2',
    key: '2',
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

  const ingredient_2: TConstructorIngredient = {
    _id: '4',
    key: '4',
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

  const ingredient_3: TConstructorIngredient = {
    _id: '3',
    key: '3',
    name: 'Мясо моллюсков',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  };

  const bun: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const initialState: RightSideOFMainInterface = {
    bun: null,
    ingredients: [ingredient_1, ingredient_2]
  };

  it('Добавление ингридиентов', () => {
    const action = {
      type: addIngredient.type,
      payload: { ...ingredient_3, key: '3' }
    };
    const state = constructorSliceReducer(initialState, action);
    expect(state.ingredients).toHaveLength(3);
    expect(
      state.ingredients.find((ing) => ing.name === 'Мясо моллюсков')
    ).toEqual(ingredient_3);
  });

  it('Добавление булок', () => {
    const state = constructorSliceReducer(initialState, addBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('Удаление ингридиентов', () => {
    const state = constructorSliceReducer(
      initialState,
      removeIngredient(ingredient_1._id)
    );
    expect(state.ingredients).toHaveLength(1);
  });

  it('Изменение положения ингредиентов в конструкторе', () => {
    const state = constructorSliceReducer(
      initialState,
      changePositionIngredients({ from: 1, to: 0 })
    );

    expect(state).toEqual({
      bun: null,
      ingredients: [ingredient_2, ingredient_1]
    });
  });

  it('Очистка конструктора', () => {
    const state = constructorSliceReducer(initialState, resetConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
