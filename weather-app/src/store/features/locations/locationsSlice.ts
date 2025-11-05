import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '@/types';

interface LocationsState {
  favorites: Location[];
}

const initialState: LocationsState = {
  favorites: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Location>) => {
      const exists = state.favorites.find(loc => loc.latitude === action.payload.latitude && loc.longitude === action.payload.longitude);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
      state.favorites = state.favorites.filter(
        loc => loc.latitude !== action.payload.lat || loc.longitude !== action.payload.lon
      );
    },
  },
});

export const { addFavorite, removeFavorite } = locationsSlice.actions;

export default locationsSlice.reducer;
