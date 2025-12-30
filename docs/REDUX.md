# Guía de Redux en el Proyecto

## Introducción

Este proyecto usa **Redux Toolkit** para la gestión de estado global, junto con **RTK Query** para el fetching de datos y **Redux Persist** para la persistencia.

## Configuración del Store

El store está configurado en `store/index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Slices
import waterReducer from './slices/waterSlice';
import themeReducer from './slices/themeSlice';
import { baseApi } from './api/baseApi';
```

### Persistencia

Solo los slices `water` y `theme` se persisten. El cache de RTK Query no se persiste (se regenera al iniciar).

## Slices

### waterSlice

Gestiona el estado de hidratación:

```typescript
interface WaterState {
  glasses: number;  // Vasos consumidos
  goal: number;     // Objetivo diario
}
```

**Actions disponibles:**
- `addGlass()` - Incrementa el contador de vasos
- `removeGlass()` - Decrementa el contador (mínimo 0)
- `reset()` - Resetea el contador a 0
- `setGoal(number)` - Establece el objetivo diario
- `setGlasses(number)` - Establece el número de vasos

**Uso:**
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addGlass, setGoal } from '@/store/slices/waterSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { glasses, goal } = useAppSelector((state) => state.water);

  return (
    <Button onPress={() => dispatch(addGlass())}>
      Agregar vaso
    </Button>
  );
}
```

### themeSlice

Gestiona el tema de la aplicación:

```typescript
interface ThemeState {
  darkMode: boolean | null;  // null = usar preferencia del sistema
  isLoading: boolean;
}
```

**Actions disponibles:**
- `setDarkMode(boolean | null)` - Establece el modo oscuro
- `setLoading(boolean)` - Controla el estado de carga

**Uso:**
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDarkMode } from '@/store/slices/themeSlice';

function ThemeToggle() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <Switch
      value={darkMode === true}
      onValueChange={(value) => dispatch(setDarkMode(value))}
    />
  );
}
```

## Hooks Tipados

Usa los hooks tipados en lugar de los hooks estándar de react-redux:

```typescript
// ✅ Correcto
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// ❌ Incorrecto
import { useDispatch, useSelector } from 'react-redux';
```

Esto proporciona:
- Autocompletado de TypeScript
- Type safety para el estado
- Type safety para las actions

## RTK Query

### Configuración Base

La API base está en `store/api/baseApi.ts`:

```typescript
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['WaterStats', 'User'],
  endpoints: () => ({}),
});
```

### Endpoints

Los endpoints están en `store/api/waterApi.ts`:

**Queries (lectura):**
- `getWaterStats` - Obtiene estadísticas de hidratación
- `getUser` - Obtiene información del usuario

**Mutations (escritura):**
- `updateWaterStats` - Actualiza estadísticas (con optimistic update)
- `createWaterStats` - Crea nueva estadística

### Uso de RTK Query

```typescript
import { useGetWaterStatsQuery, useUpdateWaterStatsMutation } from '@/store/api/waterApi';

function StatsScreen() {
  // Query automático con cache
  const { data, isLoading, error, refetch } = useGetWaterStatsQuery();

  // Mutation
  const [updateStats, { isLoading: isUpdating }] = useUpdateWaterStatsMutation();

  const handleUpdate = async () => {
    try {
      await updateStats({ id: 1, glasses: 10, goal: 12 }).unwrap();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return <StatsList data={data} />;
}
```

### Características de RTK Query

1. **Cache Automático**: Los datos se cachean automáticamente
2. **Refetch Inteligente**: Refetch automático al re-enfocar la app
3. **Optimistic Updates**: Actualizaciones optimistas en mutations
4. **Tag-based Invalidation**: Invalidación de cache por tags

## Mejores Prácticas

### 1. Usar Hooks Tipados

Siempre usa `useAppDispatch` y `useAppSelector`:

```typescript
// ✅ Correcto
const dispatch = useAppDispatch();
const water = useAppSelector((state) => state.water);

// ❌ Incorrecto
const dispatch = useDispatch();
const water = useSelector((state: RootState) => state.water);
```

### 2. Selectores Memoizados

Para selectores complejos, usa `createSelector`:

```typescript
import { createSelector } from '@reduxjs/toolkit';

const selectWaterPercentage = createSelector(
  [(state: RootState) => state.water],
  (water) => (water.glasses / water.goal) * 100
);
```

### 3. Evitar Lógica en Componentes

Mueve la lógica a los slices o a custom hooks:

```typescript
// ✅ Correcto - Lógica en el slice
const waterSlice = createSlice({
  reducers: {
    addGlass: (state) => {
      state.glasses += 1;
    },
  },
});

// ❌ Incorrecto - Lógica en el componente
function Component() {
  const dispatch = useAppDispatch();
  const glasses = useAppSelector((state) => state.water.glasses);
  
  const handleAdd = () => {
    dispatch({ type: 'water/addGlass', payload: glasses + 1 });
  };
}
```

### 4. Usar RTK Query para Datos Remotos

No uses Redux para datos que vienen de APIs. Usa RTK Query:

```typescript
// ✅ Correcto - RTK Query
const { data } = useGetWaterStatsQuery();

// ❌ Incorrecto - Redux manual
useEffect(() => {
  fetch('/api/stats').then(setStats);
}, []);
```

## Testing

Los slices se pueden testear fácilmente:

```typescript
import waterReducer, { addGlass } from '@/store/slices/waterSlice';

describe('waterSlice', () => {
  it('should increment glasses', () => {
    const state = { glasses: 0, goal: 12 };
    const newState = waterReducer(state, addGlass());
    expect(newState.glasses).toBe(1);
  });
});
```

## Recursos

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Persist Docs](https://github.com/rt2zz/redux-persist)

