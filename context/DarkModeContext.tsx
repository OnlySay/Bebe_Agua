import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const DARK_MODE_KEY = '@bebe_agua:dark_mode';

type DarkModeContextType = {
  darkMode: boolean | null; // null = usa preferencia del sistema
  handleDarkMode: (value: boolean | null) => Promise<void>;
  isLoading: boolean;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDarkMode();
  }, []);

  const loadDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem(DARK_MODE_KEY);
      if (value === 'true') {
        setDarkMode(true);
      } else if (value === 'false') {
        setDarkMode(false);
      } else {
        setDarkMode(null); // No configurado, usa sistema
      }
    } catch (error) {
      console.error('Error loading dark mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDarkMode = async (value: boolean | null) => {
    try {
      if (value === null) {
        await AsyncStorage.removeItem(DARK_MODE_KEY);
      } else {
        await AsyncStorage.setItem(DARK_MODE_KEY, value.toString());
      }
      setDarkMode(value);
    } catch (error) {
      console.error('Error saving dark mode:', error);
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, handleDarkMode, isLoading }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}

