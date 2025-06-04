import { TOrder } from '@utils-types';
import { getFeed } from './actions';
import { createSlice } from '@reduxjs/toolkit';

interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => ({
      orders: state.orders,
      total: state.total,
      totalToday: state.totalToday
    })
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { getFeedSelector } = feedSlice.selectors;
