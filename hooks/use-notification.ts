import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEnabled, setReminderInterval } from '@/store/slices/notificationSlice';
import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';
import { Platform } from 'react-native';
// Configurar el handler de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NOTIFICATION_CONFIG = {
  title: '💧 ¡No te olvides de beber agua!',
  body: 'aunque sea una gota, es importante para tu salud',
  sound: 'default',
};

// ID del canal de notificación para Android
const CHANNEL_ID = 'water-reminder-channel';

export function useNotifications() {
  const dispatch = useAppDispatch();
  const enabled = useAppSelector((state) => state.notification.enabled);
  const reminderInterval = useAppSelector((state) => state.notification.reminderInterval);



  /**
   * Función de prueba: Solo envía una notificación para verificar que funciona
   */
  const sendTestNotification = useCallback(async () => {
    try {
      // Consultar permisos nativamente
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      // Solicitar permisos si no están concedidos
      // Nota: Android no acepta opciones en requestPermissionsAsync, solo iOS
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
        finalStatus = newStatus;
      }

      if (finalStatus !== 'granted') {
        console.warn('Permisos de notificación no concedidos');
        return;
      }

      // Configurar canal para Android si es necesario
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
          name: NOTIFICATION_CONFIG.title,
          description: NOTIFICATION_CONFIG.body,
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          enableVibrate: true,
        });
      }

      // Enviar notificación de prueba
      // Usar trigger con 1 segundo en lugar de null para mejor compatibilidad en Android
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: NOTIFICATION_CONFIG.title,
          body: NOTIFICATION_CONFIG.body,
          sound: NOTIFICATION_CONFIG.sound,
          ...(Platform.OS === 'android' && {
            channelId: CHANNEL_ID,
          }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 1,
          repeats: false,
        },
      });

      console.log('✅ Notificación de prueba enviada con ID:', notificationId);
    } catch (error) {
      console.error('❌ Error enviando notificación de prueba:', error);
    }
  }, []);

  /**
   * Inicializa la configuración de notificaciones (permisos y canal)
   */
  const initConfig = useCallback(async (): Promise<boolean> => {
    try {
      // Consultar permisos
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      // Solicitar permisos si no están concedidos
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
        finalStatus = newStatus;
      }

      if (finalStatus !== 'granted') {
        console.warn('Permisos de notificación no concedidos');
        return false;
      }

      // Configurar canal para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
          name: NOTIFICATION_CONFIG.title,
          description: NOTIFICATION_CONFIG.body,
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          enableVibrate: true,
        });
      }

      return true;
    } catch (error) {
      console.error('Error inicializando configuración:', error);
      return false;
    }
  }, []);

  /**
   * Programa la notificación recurrente con el intervalo configurado
   */
  const setNotification = useCallback(async (): Promise<boolean> => {
    try {
      // Inicializar configuración si es necesario
      const initialized = await initConfig();
      if (!initialized) {
        console.warn('No se pudo inicializar la configuración de notificaciones');
        return false;
      }

      // Cancelar todas las notificaciones anteriores
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Convertir intervalo de milisegundos a segundos
      let intervalInSeconds = Math.floor(reminderInterval / 1000);

      // Validar intervalo
      if (intervalInSeconds <= 0 || !isFinite(intervalInSeconds)) {
        console.warn(`Intervalo inválido: ${intervalInSeconds}s, usando 3600s por defecto`);
        intervalInSeconds = 3600;
      }

      // iOS requiere mínimo 60 segundos
      const minInterval = Platform.OS === 'ios' ? 60 : 1;
      const validInterval = Math.max(intervalInSeconds, minInterval);

      // Programar notificación recurrente
      await Notifications.scheduleNotificationAsync({
        content: {
          title: NOTIFICATION_CONFIG.title,
          body: NOTIFICATION_CONFIG.body,
          sound: NOTIFICATION_CONFIG.sound,
          ...(Platform.OS === 'android' && {
            channelId: CHANNEL_ID,
          }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: Math.round(validInterval),
          repeats: true,
        },
      });

      console.log(`✅ Notificación programada cada ${Math.round(validInterval)} segundos`);
      return true;
    } catch (error) {
      console.error('❌ Error programando notificación:', error);
      return false;
    }
  }, [reminderInterval, initConfig]);

  const handleNotificationsChange = useCallback(async (value: boolean) => {
    dispatch(setEnabled(value));
    if (value) {
      await setNotification();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [dispatch, setNotification]);

  const handleIntervalChange = useCallback(async (minutes: number) => {
    dispatch(setReminderInterval(minutes * 60 * 1000));
    if (enabled) {
      await setNotification();
    }
  }, [dispatch, enabled, setNotification]);

  // Opciones de intervalo en minutos
  const intervalOptions = [
    { label: '1 minuto (prueba)', value: 1 },
    { label: '15 minutos', value: 15 },
    { label: '30 minutos', value: 30 },
    { label: '60 minutos', value: 60 },
    { label: '120 minutos', value: 120 },
  ];

  const reminderIntervalMinutes = reminderInterval / (60 * 1000);

  return {
    enabled,
    reminderIntervalMinutes,
    intervalOptions,
    handleIntervalChange,
    sendTestNotification,
    setNotification,
    handleNotificationsChange,
  };
}
