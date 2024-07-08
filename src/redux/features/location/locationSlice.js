import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPsychiatrists } from '@/redux/features/professionals/professionalsAPI';

export const getUserLocation = createAsyncThunk('location/getUserLocation', async (_, { dispatch }) => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const { latitude, longitude } = position.coords;
  dispatch(getPsychiatrists({ lat: latitude, lng: longitude }));
  return { lat: latitude, lng: longitude };
});

export const getPsychiatrists = createAsyncThunk('location/getPsychiatrists', async ({ lat, lng }) => {
  const data = await fetchPsychiatrists(lat, lng);
  return data.items;
});

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    userLocation: null,
    psychiatrists: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.userLocation = action.payload;
      })
      .addCase(getUserLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPsychiatrists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPsychiatrists.fulfilled, (state, action) => {
        state.loading = false;
        state.psychiatrists = action.payload;
      })
      .addCase(getPsychiatrists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
