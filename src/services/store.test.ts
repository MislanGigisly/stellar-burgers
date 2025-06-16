import { initialState as ingredientsReducer, ingredientsSlice } from '../services/slices/ingredientsSlice/ingredientsSlice';
import { initialState as constructorReducer, constructorSlice } from '../services/slices/constractorSlice/constractorSlice';
import { initialState as orderReducer } from '../services/slices/orderSlice/orderSlice';
import { initialState as feedReducer } from '../services/slices/feedSlice/feedSlice';
import { initialState as userReducer, userSelector, userSlice } from '../services/slices/userSlice/userSlice';
import store from './store';

const initialState = {
  ingredientsSlice: ingredientsReducer,
  constructorSlice: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  userSlice: userReducer
};

describe('rootReducer', () => {
  it('should initialize', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('отправка не известного экшена в стор', () => {
    const action = { type: 'unknownAction' };
    store.dispatch(action);
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('Обновление состояния', () => {
    const action = {
      type: 'constructorSlice/addBun',
      payload: {
        type: 'bun',
        name: 'Булка'
      }
    };
    const newState = {
      bun: { name: 'Булка', type: 'bun' },
      ingredients: []
    };
    store.dispatch(action);
    const state = store.getState();
    expect(state.constructorSlice).toEqual(newState);
  });
});
