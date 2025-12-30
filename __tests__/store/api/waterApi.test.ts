import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/store/api/baseApi';
import { waterApi } from '@/store/api/waterApi';

// Helper para crear un store de prueba
function createTestStore() {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
}

describe('waterApi', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should have getWaterStats endpoint', () => {
    expect(waterApi.endpoints.getWaterStats).toBeDefined();
  });

  it('should have getUser endpoint', () => {
    expect(waterApi.endpoints.getUser).toBeDefined();
  });

  it('should have updateWaterStats mutation', () => {
    expect(waterApi.endpoints.updateWaterStats).toBeDefined();
  });

  it('should have createWaterStats mutation', () => {
    expect(waterApi.endpoints.createWaterStats).toBeDefined();
  });

  // Nota: Los tests de integración reales requerirían un mock del fetch
  // o usar MSW (Mock Service Worker) para simular las respuestas de la API
});

