import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/settings/settingsSlice';
import locationsReducer from './features/locations/locationsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    locations: locationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
