import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';

export interface RightSideOFMainInterface {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
}

export const initialState: RightSideOFMainInterface = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, key: ingredient._id }
      })
    },
    changePositionIngredients: (state, action) => {
      const { from, to } = action.payload;
      const movedItem = state.ingredients[from];
      state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, movedItem);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.key !== action.payload
      );
    },
    resetConstructor: (state) => initialState
  },
  //extraReducers:
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients,
    getConstructorItems: (state) => state
  }
});

export default constructorSlice.reducer;
export const {
  addBun,
  addIngredient,
  changePositionIngredients,
  removeIngredient,
  resetConstructor
} = constructorSlice.actions;

export const { getBun, getIngredients, getConstructorItems } =
  constructorSlice.selectors;
