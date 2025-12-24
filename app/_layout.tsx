import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DarkModeProvider, useDarkMode } from '@/context/DarkModeContext';
import { WaterProvider } from '@/context/WaterContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFirstLaunch } from '@/hooks/use-first-launch';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { isFirstLaunch, isLoading } = useFirstLaunch();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (!isLoading && isFirstLaunch) {
      router.push('/welcome'); 
    }
  }, [isLoading, isFirstLaunch]);

  const getTheme = () => {
    if (darkMode !== null) {
      return darkMode ? DarkTheme : DefaultTheme;
    }
    return colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  };

  return (
    <ThemeProvider value={getTheme()}>
      <WaterProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false, presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style={darkMode === null ? 'auto' : darkMode ? 'light' : 'dark'} />
      </WaterProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <DarkModeProvider>
      <RootLayoutContent />
    </DarkModeProvider>
  );
}
