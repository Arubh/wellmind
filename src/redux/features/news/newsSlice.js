
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from './newsAPI';

const initialState = {
  news: [],
  status: 'idle',
  error: null,
};

export const getNews = createAsyncThunk('news/getNews', async () => {
  const response = await fetchNews();
  return response.articles;
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
