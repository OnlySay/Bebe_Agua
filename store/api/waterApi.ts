import { baseApi } from './baseApi';

// Tipos para las respuestas de la API
export interface WaterStats {
  id: number;
  date: string;
  glasses: number;
  goal: number;
  percentage: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Extender la API base con endpoints específicos de agua
export const waterApi = baseApi.injectEndpoints({
  overrideExisting: __DEV__, // Solo permitir sobrescribir endpoints en desarrollo (hot reload)
  endpoints: (builder) => ({
    // Query para obtener estadísticas de hidratación
    // Usamos JSONPlaceholder como ejemplo, en producción sería tu API real
    getWaterStats: builder.query<WaterStats[], void>({
      query: () => '/posts?_limit=5', // Ejemplo usando JSONPlaceholder
      transformResponse: (response: any[]) => {
        // Transformar la respuesta de JSONPlaceholder a nuestro formato
        return response.map((post, index) => ({
          id: post.id,
          date: new Date(Date.now() - index * 86400000).toISOString(), // Últimos 5 días
          glasses: Math.floor(Math.random() * 15) + 5,
          goal: 12,
          percentage: Math.floor(Math.random() * 100),
        }));
      },
      providesTags: ['WaterStats'],
    }),

    // Ejemplos comentados de diferentes métodos HTTP (no funcionales):
    // 
    // POST - Crear un nuevo recurso:
    // createExample: builder.mutation<WaterStats, Omit<WaterStats, 'id'>>({
    //   query: (newStats) => ({
    //     url: '/water-stats',
    //     method: 'POST',
    //     body: newStats,
    //   }),
    //   invalidatesTags: ['WaterStats'],
    // }),
    //
    // PUT - Actualizar completamente un recurso (reemplaza todo):
    // replaceExample: builder.mutation<WaterStats, WaterStats>({
    //   query: (stats) => ({
    //     url: `/water-stats/${stats.id}`,
    //     method: 'PUT',
    //     body: stats, // Envía el objeto completo
    //   }),
    //   invalidatesTags: ['WaterStats'],
    // }),
    //
    // PATCH - Actualizar parcialmente un recurso (solo campos específicos):
    // updateExample: builder.mutation<WaterStats, { id: number; glasses?: number; goal?: number }>({
    //   query: ({ id, ...updates }) => ({
    //     url: `/water-stats/${id}`,
    //     method: 'PATCH',
    //     body: updates, // Solo envía los campos que quieres actualizar
    //   }),
    //   invalidatesTags: ['WaterStats'],
    // }),
    //
    // DELETE - Eliminar un recurso:
    // deleteExample: builder.mutation<void, number>({
    //   query: (id) => ({
    //     url: `/water-stats/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['WaterStats'],
    // }),

    

    // Query para obtener información del usuario
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: any): User => ({
        id: response.id,
        name: response.name,
        email: response.email,
        phone: response.phone,
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Mutation para actualizar estadísticas (ejemplo con optimistic update)
    updateWaterStats: builder.mutation<
      WaterStats,
      { id: number; glasses: number; goal: number }
    >({
      query: ({ id, glasses, goal }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: { glasses, goal },
      }),
      // Optimistic update: actualiza la UI antes de que la respuesta llegue
      async onQueryStarted({ id, glasses, goal }, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          waterApi.util.updateQueryData('getWaterStats', undefined, (draft) => {
            const stat = draft.find((s) => s.id === id);
            if (stat) {
              stat.glasses = glasses;
              stat.goal = goal;
              stat.percentage = Math.round((glasses / goal) * 100);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // Si falla, revertir el optimistic update
          patchResult.undo();
        }
      },
      invalidatesTags: ['WaterStats'],
    }),

    // Mutation para crear nueva estadística
    createWaterStats: builder.mutation<WaterStats, Omit<WaterStats, 'id'>>({
      query: (stats) => ({
        url: '/posts',
        method: 'POST',
        body: stats,
      }),
      invalidatesTags: ['WaterStats'],
    }),
  }),
});

// Exportar hooks generados automáticamente
export const {
  useGetWaterStatsQuery,
  useGetUserQuery,
  useUpdateWaterStatsMutation,
  useCreateWaterStatsMutation,
} = waterApi;

