import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '@/redux/features/news/newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
