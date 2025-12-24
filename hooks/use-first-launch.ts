// hooks/use-first-launch.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const TUTORIAL_SEEN_KEY = '@bebe_agua:tutorial_seen';

export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasSeenTutorial = await AsyncStorage.getItem(TUTORIAL_SEEN_KEY);
      setIsFirstLaunch(hasSeenTutorial === null);
    } catch (error) {
      setIsFirstLaunch(false);
    } finally {
      setIsLoading(false);
    }
  };

  const markTutorialAsSeen = async () => {
    try {
      await AsyncStorage.setItem(TUTORIAL_SEEN_KEY, 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error saving tutorial state:', error);
    }
  };
  
  const resetTutorial = async () => {
    try {
      await AsyncStorage.removeItem(TUTORIAL_SEEN_KEY);
      setIsFirstLaunch(true);
    } catch (error) {
      console.error('Error resetting tutorial state:', error);
    }
  };

  return { isFirstLaunch, isLoading, markTutorialAsSeen, resetTutorial };
}