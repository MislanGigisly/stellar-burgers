import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredientsThunk',
  async () => getIngredientsApi()
);

export interface Ingredient {
  success: boolean;
  data: TIngredient[];
  isLoading: boolean;
  error: undefined | string;
}

const initialState: Ingredient = {
  success: false,
  data: [],
  isLoading: true,
  error: undefined
};

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state, error) => {
      state.isLoading = true;
      console.log('ошибка:', error.error.message);
      state.error = error.error?.message;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
      state.data = payload;
    });
  },
  selectors: {
    getState: (state) => state,
    getData: (state) => state.data,
    getBuns: createSelector(
      (state: Ingredient) => state.data,
      (data) => data.filter((ing) => ing.type == 'bun')
    ),
    getMains: createSelector(
      (state: Ingredient) => state.data,
      (data) => data.filter((ing) => ing.type == 'main')
    ),
    getSauces: createSelector(
      (state: Ingredient) => state.data,
      (data) => data.filter((ing) => ing.type == 'sauce')
    ),
    getIngredientById: (state, id) =>
      state.data.find((ingredient) => ingredient._id === id),
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});

//export const {init} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
export const {
  getData,
  getError,
  getLoading,
  getBuns,
  getMains,
  getSauces,
  getState,
  getIngredientById
} = ingredientsSlice.selectors;
