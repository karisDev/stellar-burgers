import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders } from './actions';

interface TOrdersState {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  order: null,
  isLoading: true
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getOrderByNumberSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
        }
      );
  }
});

export const { getOrdersSelector, getOrderByNumberSelector } =
  ordersSlice.selectors;

export const { clearOrder } = ordersSlice.actions;
