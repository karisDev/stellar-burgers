import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setAuthChecked, setUser } from './slice';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const register = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const login = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (!getCookie('accessToken')) {
        dispatch(setUser(null));
        return;
      }

      const response = await getUserApi();
      dispatch(setUser(response.user));
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
    }
  }
);
