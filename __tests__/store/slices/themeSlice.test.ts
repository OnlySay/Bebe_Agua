import themeReducer, { setDarkMode, setLoading } from '@/store/slices/themeSlice';

describe('themeSlice', () => {
  const initialState = {
    darkMode: null,
    isLoading: true,
  };

  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setDarkMode to true', () => {
    const actual = themeReducer(initialState, setDarkMode(true));
    expect(actual.darkMode).toEqual(true);
    expect(actual.isLoading).toEqual(true); // Loading should remain unchanged
  });

  it('should handle setDarkMode to false', () => {
    const actual = themeReducer(initialState, setDarkMode(false));
    expect(actual.darkMode).toEqual(false);
  });

  it('should handle setDarkMode to null', () => {
    const stateWithDarkMode = { darkMode: true, isLoading: false };
    const actual = themeReducer(stateWithDarkMode, setDarkMode(null));
    expect(actual.darkMode).toEqual(null);
  });

  it('should handle setLoading to false', () => {
    const actual = themeReducer(initialState, setLoading(false));
    expect(actual.isLoading).toEqual(false);
    expect(actual.darkMode).toEqual(null); // DarkMode should remain unchanged
  });

  it('should handle setLoading to true', () => {
    const stateWithLoadingFalse = { darkMode: false, isLoading: false };
    const actual = themeReducer(stateWithLoadingFalse, setLoading(true));
    expect(actual.isLoading).toEqual(true);
  });
});

