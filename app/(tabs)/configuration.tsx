import { StyleSheet, Switch, View } from 'react-native';

import Body from '@/components/body';
import { ThemedText } from '@/components/themed-text';
import { useDarkMode } from '@/context/DarkModeContext';

export default function ConfigurationScreen() {
  const { darkMode, handleDarkMode } = useDarkMode();

  return (
    <Body>
      <ThemedText type="title">Configuracion</ThemedText>
      <View style={styles.row}>
        <Switch
          value={darkMode === true}
          onValueChange={(value) => handleDarkMode(value)}
        />
        <ThemedText type="default">Modo oscuro</ThemedText>
      </View>
    </Body>
  );
}

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    gap: 8,
  },
});
