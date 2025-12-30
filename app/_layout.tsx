import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDeepLinking } from '@/hooks/use-deep-linking';
import { useFirstLaunch } from '@/hooks/use-first-launch';
import { persistor, store } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDarkMode, setLoading } from '@/store/slices/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

const DARK_MODE_KEY = '@bebe_agua:dark_mode';

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { isFirstLaunch, isLoading: tutorialLoading } = useFirstLaunch();
  const dispatch = useAppDispatch();
  const { darkMode, isLoading: themeLoading } = useAppSelector((state) => state.theme);
  
  // Configurar deep linking
  useDeepLinking();

  // Cargar el estado del tema al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const value = await AsyncStorage.getItem(DARK_MODE_KEY);
        if (value === 'true') {
          dispatch(setDarkMode(true));
        } else if (value === 'false') {
          dispatch(setDarkMode(false));
        } else {
          dispatch(setDarkMode(null)); // No configurado, usa sistema
        }
      } catch (error) {
        console.error('Error loading dark mode:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (themeLoading) {
      loadTheme();
    }
  }, [dispatch, themeLoading]);

  // Guardar el estado del tema cuando cambia
  useEffect(() => {
    const saveTheme = async () => {
      if (!themeLoading) {
        try {
          if (darkMode === null) {
            await AsyncStorage.removeItem(DARK_MODE_KEY);
          } else {
            await AsyncStorage.setItem(DARK_MODE_KEY, darkMode.toString());
          }
        } catch (error) {
          console.error('Error saving dark mode:', error);
        }
      }
    };

    saveTheme();
  }, [darkMode, themeLoading]);

  useEffect(() => {
    if (!tutorialLoading && isFirstLaunch) {
      router.push('/welcome');
    }
  }, [tutorialLoading, isFirstLaunch]);

  const getTheme = () => {
    if (darkMode !== null) {
      return darkMode ? DarkTheme : DefaultTheme;
    }
    return colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  };

  return (
    <ThemeProvider value={getTheme()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false, presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={darkMode === null ? 'auto' : darkMode ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootLayoutContent />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
