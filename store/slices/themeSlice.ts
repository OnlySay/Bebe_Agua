import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean | null; // null = usa preferencia del sistema
  isLoading: boolean;
}

const initialState: ThemeState = {
  darkMode: null,
  isLoading: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (state: ThemeState, action: PayloadAction<boolean | null>) => {
      state.darkMode = action.payload;
    },
    setLoading: (state: ThemeState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setDarkMode, setLoading } = themeSlice.actions;
export default themeSlice.reducer;

