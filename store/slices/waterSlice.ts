import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WaterState {
  glasses: number;
  goal: number;
}

const initialState: WaterState = {
  glasses: 0,
  goal: 12,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    addGlass: (state: WaterState) => {
      state.glasses += 1;
    },
    removeGlass: (state: WaterState) => {
      state.glasses = Math.max(0, state.glasses - 1);
    },
    reset: (state: WaterState) => {
      state.glasses = 0;
    },
    setGoal: (state: WaterState, action: PayloadAction<number>) => {
      state.goal = action.payload;
    },
    setGlasses: (state: WaterState, action: PayloadAction<number>) => {
      state.glasses = action.payload;
    },
  },
});

export const { addGlass, removeGlass, reset, setGoal, setGlasses } = waterSlice.actions;
export default waterSlice.reducer;

