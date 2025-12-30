// store/slices/notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  enabled: boolean;
  reminderInterval: number;
}

/**
 * Estado inicial de las notificaciones
 */
const initialState: NotificationState = {
  enabled: true, // Por defecto habilitadas
  reminderInterval: 60 * 60 * 1000, // 1 hora en milisegundos
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setEnabled: (state: NotificationState, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
    setReminderInterval: (state: NotificationState, action: PayloadAction<number>) => {
      state.reminderInterval = action.payload;
    },
  },
});
  
export const { setEnabled, setReminderInterval } = notificationSlice.actions;
export default notificationSlice.reducer;

