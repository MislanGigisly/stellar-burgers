import { Action } from '@reduxjs/toolkit';
import userReducer, {
  getUser,
  loginUser,
  logout,
  updateUser,
  initialState
} from './userSlice';
import { TRegisterData } from '@api';

describe('userSlice', () => {
  const response = {
    success: true,
    user: {
      email: 'TEST@gmail.com',
      name: 'TEST'
    }
  };

  const data: TRegisterData = {
    email: 'TEST@gmail.com',
    name: 'TEST',
    password: '11111'
  };

  const mockState = (action: Action) => userReducer(initialState, action);

  it('Получить начальное состояние', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('Индефицировать пользователя', () => {
    const action = { type: getUser.pending.type };
    const state = mockState(action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('Ошибка при индефикации пользователя', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Error fetching' }
    };
    const state = mockState(action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'Error fetching'
    });
  });

  it('Успешная индефикация пользователя', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: response
    };
    const state = mockState(action);

    expect(state).toEqual({
      ...initialState,
      user: {
        email: data.email,
        name: data.name
      },
      isAuthChecked: true,
      isAuth: true,
      loading: false,
      error: null
    });
  });

  it('Вход в аккаунт', () => {
    const { email, password } = data;
    const state = mockState(loginUser.pending('', { email, password }));
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('Ошибка входа в аккаунт', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error' }
    };
    const state = mockState(action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      error: 'Error'
    });
  });

  it('Удачный вход в аккаунт', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: data
    };
    const state = mockState(action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      loading: false,
      error: null,
      user: {
        email: data.email,
        name: data.name,
        password: data.password
      }
    });
  });

  it('Удачный выход из аккаунта', () => {
    const actualState = {
      ...initialState,
      isAuthChecked: false,
      user: {
        email: data.email,
        name: data.name
      }
    };
    const action = logout.fulfilled({ success: true }, '', undefined);
    const state = userReducer(actualState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  it('Обновление пользователя', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = mockState(action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('Ошибка при обновлнии пользователя', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error fetching' }
    };
    const state = mockState(action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error fetching');
    expect(state.user).toBeNull();
  });

  it('Успешное обновление пользователя', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: response
    };
    const state = mockState(action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuth: true,
      error: null,
      loading: false,
      user: {
        email: data.email,
        name: data.name
      }
    });
  });
});
