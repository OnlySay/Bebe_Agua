import { StyleSheet, Switch, View } from 'react-native';

import Body from '@/components/body';
import { ThemedText } from '@/components/themed-text';
import { useNotifications } from '@/hooks/use-notification';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDarkMode } from '@/store/slices/themeSlice';


export default function ConfigurationScreen() {
  const dispatch = useAppDispatch();

  // Estado del tema desde Redux
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  // Hook de notificaciones que combina permisos del sistema + preferencia del usuario
  const {
    enabled: notificationsEnabled,
    handleNotificationsChange
  } = useNotifications();

  const handleDarkModeChange = (value: boolean) => {
    dispatch(setDarkMode(value));
  };

  return (
    <Body>
      <ThemedText type="title">Configuración</ThemedText>

      {/* Sección de Tema */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Switch value={darkMode === true} onValueChange={handleDarkModeChange} />
          <ThemedText type="default">Modo oscuro</ThemedText>
        </View>
      </View>

      {/* Sección de Notificaciones */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsChange}
          />
          <View style={styles.labelContainer}>
            <ThemedText type="default">Notificaciones</ThemedText>
          </View>
        </View>
      </View>
    </Body>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  labelContainer: {
    flex: 1,
    gap: 4,
  },
  warning: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  settingsLink: {
    fontSize: 14,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});
