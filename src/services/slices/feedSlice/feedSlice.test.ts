import { preProcessFile } from 'typescript';
import feedReducer, { getFeeds, initialState, resetFeeds } from './feedSlice';
import { TOrder } from '@utils-types';

const previousState = {
  orders: [
    {
      _id: '1',
      status: 'pending',
      name: 'orde',
      createdAt: '2025-05-31',
      updatedAt: '2025-05-30',
      number: 1,
      ingredients: ['ingredient_1', 'ingredient_2']
    }
  ],
  total: 1,
  totalToday: 1,
  loading: true,
  error: 'Some error'
};

describe('feedSlice', () => {
  it('обновить заказы', () => {
    expect(feedReducer(previousState, resetFeeds())).toEqual(initialState);
  });
});

describe('async actions', () => {
  test('Проверить отправку запроса на получение всех заказов', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('Проверить ошибку в заказах', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Error fetching feeds' }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error fetching feeds');
  });

  it('Проверить получение всех заказов', () => {
    const orders: TOrder[] = previousState.orders;
    const total = 1;
    const totalToday = 1;

    const feedResponse = {
      success: true,
      orders,
      total,
      totalToday
    };

    const newState = feedReducer(
      initialState,
      getFeeds.fulfilled(feedResponse, '')
    );

    expect(newState).toEqual({
      orders: orders,
      total: total,
      totalToday: totalToday,
      loading: false,
      error: null
    });
  });
});
