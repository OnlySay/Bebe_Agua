/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useDarkMode } from '@/context/DarkModeContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemColorScheme = useColorScheme();
  const { darkMode } = useDarkMode();
  
  const theme = darkMode !== null 
    ? (darkMode ? 'dark' : 'light') 
    : (systemColorScheme ?? 'light');
  
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
