 import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Clave para almacenar el token en AsyncStorage
// const TOKEN_KEY = '@bebe_agua:auth_token';

// Configuración base de RTK Query
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com', // API pública de ejemplo
    prepareHeaders: async (headers, { getState }) => {
      // Opción 1: Obtener token desde AsyncStorage (recomendado para tokens persistentes)
      //const token = await AsyncStorage.getItem(TOKEN_KEY);
      
      // Opción 2: Obtener token desde Redux Store (si tienes un slice de auth)
      // const state = getState() as RootState;
      // const token = state.auth?.token;
      
      // Agregar el token a los headers si existe
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      
      // Headers comunes
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['WaterStats', 'User'], // Tipos de tags para cache invalidation
  endpoints: () => ({}), // Los endpoints se definen en los archivos específicos
});

