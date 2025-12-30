import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { baseApi } from './api/baseApi';
import notificationReducer from './slices/notificationSlice';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import waterReducer from './slices/waterSlice';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['water', 'theme', 'notification', 'user'], // Solo persistir estos slices (no la API)
};

// Combinar todos los reducers
const rootReducer = combineReducers({
  water: waterReducer,
  theme: themeReducer,
  notification: notificationReducer,
  user: userReducer,  
  [baseApi.reducerPath]: baseApi.reducer, // Reducer de RTK Query
});

// Aplicar persistencia al root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
            FLUSH // fuerza la serialización de la acción
          , REHYDRATE // recupera el estado del store
          , PAUSE // pausa el store
          , PERSIST // persiste el store
          , PURGE // purga el store
          , REGISTER // registra el store
        ],
      },
    }).concat(baseApi.middleware), // Agregar middleware de RTK Query
});

// Crear el persistor
export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

