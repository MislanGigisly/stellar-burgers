import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { constructorSlice } from './slices/constractorSlice/constractorSlice';
import { userSlice } from './slices/userSlice/userSlice';
import { feedSlice } from './slices/feedSlice/feedSlice';
import { orderSlice } from './slices/orderSlice/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  userSlice,
  feedSlice,
  orderSlice
); // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
