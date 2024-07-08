import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '@/redux/features/news/newsSlice';
import locationReducer from './features/location/locationSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    location: locationReducer,
  },
});

export default store;
