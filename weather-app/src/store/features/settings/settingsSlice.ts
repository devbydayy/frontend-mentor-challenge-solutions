import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TempUnit = 'C' | 'F';
type SpeedUnit = 'km/h' | 'mph';
type PrecipUnit = 'mm' | 'in';
type System = 'Metric' | 'Imperial';

interface SettingsState {
  system: System;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
  precipUnit: PrecipUnit;
}

const initialState: SettingsState = {
  system: 'Metric',
  tempUnit: 'C',
  speedUnit: 'km/h',
  precipUnit: 'mm',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSystem: (state, action: PayloadAction<System>) => {
      state.system = action.payload;
      if (action.payload === 'Imperial') {
        state.tempUnit = 'F';
        state.speedUnit = 'mph';
        state.precipUnit = 'in';
      } else {
        state.tempUnit = 'C';
        state.speedUnit = 'km/h';
        state.precipUnit = 'mm';
      }
    },
    setTempUnit: (state, action: PayloadAction<TempUnit>) => {
      state.tempUnit = action.payload;
    },
    setSpeedUnit: (state, action: PayloadAction<SpeedUnit>) => {
      state.speedUnit = action.payload;
    },
    setPrecipUnit: (state, action: PayloadAction<PrecipUnit>) => {
      state.precipUnit = action.payload;
    },
  },
});

export const { setSystem, setTempUnit, setSpeedUnit, setPrecipUnit } = settingsSlice.actions;

export default settingsSlice.reducer;
