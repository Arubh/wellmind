import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from './newsAPI';

const initialState = {
  news: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalResults: 0,
};

export const getNews = createAsyncThunk('news/getNews', async (page) => {
  const response = await fetchNews(page);
  return { articles: response.articles, totalResults: response.totalResults };
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = newsSlice.actions;

export default newsSlice.reducer;
