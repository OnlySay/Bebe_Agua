# 💧 Bebe Agua - Aplicación de Hidratación

Aplicación React Native desarrollada con Expo que ayuda a los usuarios a rastrear su consumo diario de agua. Este proyecto demuestra la implementación de tecnologías modernas para desarrollo móvil, incluyendo gestión de estado con Redux Toolkit, RTK Query, persistencia de datos, deep linking, sistema de diseño componentizado y testing completo.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#-stack-tecnológico)
- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Tecnologías Implementadas](#-tecnologías-implementadas)
  - [React Native + Expo](#react-native--expo)
  - [Redux Toolkit + RTK Query](#redux-toolkit--rtk-query)
  - [Redux Persist](#redux-persist)
  - [Jest + Testing Library](#jest--testing-library)
  - [Deep Linking](#deep-linking)
  - [Sistema de Diseño](#sistema-de-diseño)
  - [React Navigation](#react-navigation)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Scripts Disponibles](#-scripts-disponibles)
- [Testing](#-testing)
- [Documentación Adicional](#-documentación-adicional)

## 🚀 Stack Tecnológico

### Core
- **React Native** (0.81.5) - Framework para desarrollo móvil multiplataforma
- **Expo** (~54.0.29) - Plataforma y herramientas para desarrollo React Native
- **TypeScript** (5.9.2) - Tipado estático para JavaScript
- **Expo Router** (6.0.19) - Enrutamiento basado en archivos

### Estado y Datos
- **Redux Toolkit** (2.0.0) - Gestión de estado global simplificada
- **RTK Query** - Fetching y caching de datos con cache automático
- **Redux Persist** (6.0.0) - Persistencia del estado en AsyncStorage
- **React Redux** (9.0.0) - Bindings de React para Redux

### Navegación
- **React Navigation** (7.x) - Sistema de navegación robusto
- **Expo Router** - File-based routing con soporte para tabs y stacks

### Testing
- **Jest** (29.7.0) - Framework de testing
- **Testing Library** (12.4.0) - Utilidades para testing de componentes React Native
- **Jest Expo** - Preset de Jest para proyectos Expo

### Deep Linking
- **Expo Linking** (8.0.10) - Manejo de deep links y universal links

### UI/UX
- **React Native Reanimated** (4.1.1) - Animaciones fluidas
- **Expo Haptics** (15.0.8) - Feedback háptico
- **Expo Symbols** (1.0.8) - Iconos SF Symbols

## ✨ Características Principales

- ✅ **Gestión de Estado Global** con Redux Toolkit
- ✅ **Fetching de Datos** con RTK Query y cache automático
- ✅ **Persistencia de Datos** con Redux Persist
- ✅ **Deep Linking** completo con soporte para acciones
- ✅ **Sistema de Diseño** componentizado y reutilizable
- ✅ **Testing Completo** con Jest y Testing Library
- ✅ **Navegación por Tabs** con Expo Router
- ✅ **Modo Oscuro/Claro** con persistencia de preferencias
- ✅ **Tutorial de Bienvenida** para nuevos usuarios
- ✅ **Estadísticas** con datos de RTK Query

## 🏗️ Arquitectura del Proyecto

La aplicación sigue una arquitectura escalable y mantenible:

```
┌─────────────────────────────────────────┐
│         React Native + Expo              │
├─────────────────────────────────────────┤
│         Expo Router (Navegación)        │
├─────────────────────────────────────────┤
│  Redux Toolkit + RTK Query (Estado)     │
├─────────────────────────────────────────┤
│      Redux Persist (Persistencia)       │
├─────────────────────────────────────────┤
│    Sistema de Diseño (Componentes)      │
└─────────────────────────────────────────┘
```

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- Expo CLI (opcional, se puede usar npx)
- iOS Simulator (para Mac) o Android Studio (para Android)

### Instalación

1. **Clonar el repositorio** (si aplica) o navegar al directorio del proyecto

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm start
# o
npx expo start
```

4. **Ejecutar en dispositivo/emulador:**
   - Presiona `i` para iOS Simulator
   - Presiona `a` para Android Emulator
   - Escanea el QR con Expo Go (para desarrollo)

## 🔧 Tecnologías Implementadas

### React Native + Expo

**¿Qué es?**
React Native permite desarrollar aplicaciones móviles nativas usando React y JavaScript. Expo es una plataforma que simplifica el desarrollo React Native proporcionando herramientas y servicios.

**Cómo se aplicó:**
- Proyecto inicializado con `create-expo-app`
- Configuración en `app.json` para iOS y Android
- Uso de Expo Router para navegación basada en archivos
- Componentes nativos de React Native (`View`, `Text`, `TouchableOpacity`, etc.)

**Cómo funciona:**
```typescript
// app/(tabs)/index.tsx
import { View, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Contenido */}
    </View>
  );
}
```

**Archivos clave:**
- `app/_layout.tsx` - Layout raíz de la aplicación
- `app/(tabs)/_layout.tsx` - Configuración de navegación por tabs
- `app.json` - Configuración de Expo

---

### Redux Toolkit + RTK Query

**¿Qué es?**
Redux Toolkit es la forma oficial y recomendada de escribir lógica Redux. RTK Query es una solución de fetching de datos potente construida sobre Redux Toolkit.

**Cómo se aplicó:**

#### 1. Configuración del Store

El store está configurado en `store/index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import waterReducer from './slices/waterSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    water: waterReducer,
    theme: themeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
```

#### 2. Slices de Redux

**waterSlice** (`store/slices/waterSlice.ts`):
- Gestiona el estado de hidratación (vasos consumidos, objetivo diario)
- Actions: `addGlass`, `removeGlass`, `reset`, `setGoal`, `setGlasses`

**themeSlice** (`store/slices/themeSlice.ts`):
- Gestiona el tema de la aplicación (modo oscuro/claro)
- Actions: `setDarkMode`, `setLoading`

#### 3. RTK Query API

**Base API** (`store/api/baseApi.ts`):
```typescript
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['WaterStats', 'User'],
  endpoints: () => ({}),
});
```

**Water API** (`store/api/waterApi.ts`):
- `getWaterStats` - Query para obtener estadísticas
- `getUser` - Query para obtener información del usuario
- `updateWaterStats` - Mutation con optimistic updates
- `createWaterStats` - Mutation para crear estadísticas

**Cómo funciona:**

```typescript
// En un componente
import { useGetWaterStatsQuery } from '@/store/api/waterApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addGlass } from '@/store/slices/waterSlice';

function MyComponent() {
  // RTK Query hook - cache automático
  const { data, isLoading, error } = useGetWaterStatsQuery();
  
  // Redux hooks tipados
  const dispatch = useAppDispatch();
  const { glasses, goal } = useAppSelector((state) => state.water);
  
  return (
    <Button onPress={() => dispatch(addGlass())}>
      Agregar vaso
    </Button>
  );
}
```

**Características implementadas:**
- ✅ Cache automático de queries
- ✅ Refetch inteligente
- ✅ Optimistic updates en mutations
- ✅ Tag-based cache invalidation
- ✅ Hooks tipados con TypeScript

**Archivos clave:**
- `store/index.ts` - Configuración del store
- `store/hooks.ts` - Hooks tipados (`useAppDispatch`, `useAppSelector`)
- `store/slices/waterSlice.ts` - Slice de hidratación
- `store/slices/themeSlice.ts` - Slice de tema
- `store/api/baseApi.ts` - API base de RTK Query
- `store/api/waterApi.ts` - Endpoints específicos

---

### Redux Persist

**¿Qué es?**
Redux Persist permite persistir el estado de Redux en AsyncStorage, manteniendo los datos entre sesiones de la aplicación.

**Cómo se aplicó:**

```typescript
// store/index.ts
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['water', 'theme'], // Solo persistir estos slices
};

const rootReducer = combineReducers({
  water: waterReducer,
  theme: themeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
```

**Integración en la app:**

```typescript
// app/_layout.tsx
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutContent />
      </PersistGate>
    </Provider>
  );
}
```

**Cómo funciona:**
1. Al iniciar la app, Redux Persist rehidrata el estado desde AsyncStorage
2. Los cambios en los slices `water` y `theme` se guardan automáticamente
3. El cache de RTK Query NO se persiste (se regenera al iniciar)

**Datos persistidos:**
- ✅ Estado de hidratación (vasos, objetivo)
- ✅ Configuración del tema (modo oscuro/claro)

**Archivos clave:**
- `store/index.ts` - Configuración de persistencia
- `app/_layout.tsx` - Integración con PersistGate

---

### Jest + Testing Library

**¿Qué es?**
Jest es un framework de testing para JavaScript. Testing Library proporciona utilidades para testear componentes React de manera que se asemeje a cómo los usuarios interactúan con ellos.

**Cómo se aplicó:**

#### 1. Configuración de Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};
```

#### 2. Setup de Tests

```javascript
// jest.setup.js
import '@testing-library/jest-native/extend-expect';

// Mocks de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mocks de expo-router
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn() },
  // ...
}));
```

#### 3. Ejemplo de Test de Slice

```typescript
// __tests__/store/slices/waterSlice.test.ts
import waterReducer, { addGlass, removeGlass, reset } from '@/store/slices/waterSlice';

describe('waterSlice', () => {
  it('should handle addGlass', () => {
    const initialState = { glasses: 0, goal: 12 };
    const actual = waterReducer(initialState, addGlass());
    expect(actual.glasses).toEqual(1);
  });

  it('should not go below 0 when removing glasses', () => {
    const initialState = { glasses: 0, goal: 12 };
    const actual = waterReducer(initialState, removeGlass());
    expect(actual.glasses).toEqual(0);
  });
});
```

#### 4. Ejemplo de Test de Componente

```typescript
// __tests__/components/design-system/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/design-system';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

**Cómo funciona:**
1. Jest ejecuta los tests en un entorno aislado
2. Testing Library renderiza componentes y simula interacciones
3. Los mocks permiten testear sin dependencias externas

**Scripts disponibles:**
```bash
npm test              # Ejecutar todos los tests
npm run test:watch     # Modo watch (re-ejecuta al cambiar archivos)
npm run test:coverage  # Ejecutar con reporte de cobertura
```

**Archivos clave:**
- `jest.config.js` - Configuración de Jest
- `jest.setup.js` - Setup y mocks globales
- `__tests__/` - Directorio con todos los tests

---

### Deep Linking

**¿Qué es?**
Deep linking permite abrir la aplicación desde URLs externas, navegando a pantallas específicas o ejecutando acciones.

**Cómo se aplicó:**

#### 1. Configuración en app.json

```json
{
  "expo": {
    "scheme": "bebeagua",
    "ios": {
      "bundleIdentifier": "com.bebeagua.app"
    },
    "android": {
      "package": "com.bebeagua.app",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            { "scheme": "bebeagua" },
            { "scheme": "https", "host": "bebeagua.app" }
          ]
        }
      ]
    }
  }
}
```

#### 2. Configuración de Rutas

```typescript
// utils/linking.ts
export const linking = {
  prefixes: ['bebeagua://', 'https://bebeagua.app'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          index: 'home',
          configuration: 'config',
          stats: 'stats',
        },
      },
      welcome: 'welcome',
    },
  },
};
```

#### 3. Hook de Deep Linking

```typescript
// hooks/use-deep-linking.ts
export function useDeepLinking() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const parsed = parseDeepLink(event.url);
      
      if (parsed?.params?.action === 'add-glass') {
        dispatch(addGlass());
        router.push('/(tabs)');
        return;
      }

      if (parsed?.route) {
        router.push(parsed.route);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, [dispatch]);
}
```

**Deep Links disponibles:**
- `bebeagua://home` - Navegar a home
- `bebeagua://config` - Navegar a configuración
- `bebeagua://stats` - Navegar a estadísticas
- `bebeagua://home?action=add-glass` - Agregar vaso y navegar a home

**Cómo funciona:**
1. El sistema operativo intercepta URLs con el scheme `bebeagua://`
2. La app se abre y el hook `useDeepLinking` procesa la URL
3. Se parsea la URL y se ejecuta la acción correspondiente

**Prueba en desarrollo:**
```bash
# iOS Simulator
xcrun simctl openurl booted "bebeagua://home"

# Android Emulator
adb shell am start -W -a android.intent.action.VIEW -d "bebeagua://home" com.bebeagua.app
```

**Archivos clave:**
- `utils/linking.ts` - Configuración y utilidades de deep linking
- `hooks/use-deep-linking.ts` - Hook para manejar deep links
- `app/_layout.tsx` - Integración del hook

---

### Sistema de Diseño

**¿Qué es?**
Un sistema de diseño es una colección de componentes reutilizables, guías de estilo y principios que aseguran consistencia en la interfaz de usuario.

**Cómo se aplicó:**

#### 1. Estructura de Componentes

Todos los componentes están en `components/design-system/`:

```
components/design-system/
├── Button.tsx          # Botón con variantes
├── Card.tsx            # Tarjeta contenedora
├── Input.tsx           # Campo de texto
├── Badge.tsx           # Badge de estado
├── ProgressBar.tsx     # Barra de progreso
├── Modal.tsx           # Modal reutilizable
├── types.ts            # Tipos TypeScript
├── styles.ts           # Estilos compartidos
└── index.ts            # Barrel exports
```

#### 2. Ejemplo: Componente Button

```typescript
// components/design-system/Button.tsx
export function Button({
  title,
  onPress,
  variant = 'primary',  // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'medium',      // 'small' | 'medium' | 'large'
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[`button_${variant}`]]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
```

#### 3. Estilos Compartidos

```typescript
// components/design-system/styles.ts
export const designSystemStyles = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};
```

#### 4. Uso en la Aplicación

```typescript
// app/(tabs)/index.tsx
import { Button } from '@/components/design-system';

export default function HomeScreen() {
  return (
    <View>
      <Button
        title="Añadir vaso"
        onPress={() => dispatch(addGlass())}
        variant="primary"
        fullWidth
      />
      <Button
        title="Quitar vaso"
        onPress={() => dispatch(removeGlass())}
        variant="secondary"
        fullWidth
      />
    </View>
  );
}
```

**Componentes disponibles:**
- ✅ **Button** - 4 variantes, 3 tamaños, estados de carga
- ✅ **Card** - 3 variantes (default, elevated, outlined)
- ✅ **Input** - Con validación, iconos, estados de error
- ✅ **Badge** - 5 variantes de color (default, success, warning, error, info)
- ✅ **ProgressBar** - Animada, con etiqueta opcional
- ✅ **Modal** - Reutilizable con animaciones

**Características:**
- ✅ Props tipadas con TypeScript
- ✅ Soporte para modo oscuro/claro
- ✅ Accesibilidad integrada (accessibilityLabel, accessibilityHint)
- ✅ Test IDs para testing
- ✅ Estilos consistentes y reutilizables

**Archivos clave:**
- `components/design-system/` - Todos los componentes
- `constants/theme.ts` - Colores y tema
- `components/design-system/styles.ts` - Estilos compartidos

---

### React Navigation

**¿Qué es?**
React Navigation es la biblioteca de navegación oficial para React Native. Expo Router proporciona file-based routing sobre React Navigation.

**Cómo se aplicó:**

#### 1. Navegación por Tabs

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab, // Feedback háptico
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: 'Configuracion',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="chart.bar.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

#### 2. Stack Navigation

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider value={getTheme()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
```

#### 3. Navegación Programática

```typescript
import { router } from 'expo-router';

// Navegar a una pantalla
router.push('/(tabs)/stats');

// Navegar y reemplazar
router.replace('/welcome');

// Navegar hacia atrás
router.back();
```

**Cómo funciona:**
1. Expo Router usa la estructura de carpetas para definir rutas
2. `app/(tabs)/` crea un grupo de tabs
3. `app/_layout.tsx` define el layout raíz
4. La navegación se puede hacer programáticamente o mediante deep links

**Estructura de rutas:**
```
app/
├── _layout.tsx          # Layout raíz (Stack)
├── (tabs)/
│   ├── _layout.tsx      # Layout de tabs
│   ├── index.tsx        # / (Home)
│   ├── configuration.tsx # /configuration
│   └── stats.tsx        # /stats
└── welcome.tsx          # /welcome (Modal)
```

**Archivos clave:**
- `app/_layout.tsx` - Layout raíz con Stack
- `app/(tabs)/_layout.tsx` - Configuración de tabs
- `components/haptic-tab.tsx` - Tab con feedback háptico

---

## 📁 Estructura de Carpetas

```
bebe_agua/
├── app/                          # Pantallas (Expo Router)
│   ├── _layout.tsx              # Layout raíz con Redux Provider
│   ├── (tabs)/                  # Navegación por tabs
│   │   ├── _layout.tsx          # Configuración de tabs
│   │   ├── index.tsx            # Pantalla principal (Home)
│   │   ├── configuration.tsx    # Configuración
│   │   └── stats.tsx            # Estadísticas (usa RTK Query)
│   └── welcome.tsx              # Pantalla de bienvenida (tutorial)
│
├── components/                   # Componentes reutilizables
│   ├── design-system/           # Sistema de diseño
│   │   ├── Button.tsx           # Botón con variantes
│   │   ├── Card.tsx             # Tarjeta contenedora
│   │   ├── Input.tsx            # Campo de texto
│   │   ├── Badge.tsx            # Badge de estado
│   │   ├── ProgressBar.tsx      # Barra de progreso
│   │   ├── Modal.tsx            # Modal reutilizable
│   │   ├── types.ts             # Tipos TypeScript
│   │   ├── styles.ts            # Estilos compartidos
│   │   └── index.ts             # Barrel exports
│   ├── body.tsx                 # Componente Body
│   ├── glass_of_water.tsx       # Componente de vaso de agua
│   ├── haptic-tab.tsx           # Tab con feedback háptico
│   ├── themed-text.tsx          # Texto con tema
│   ├── themed-view.tsx          # View con tema
│   └── ui/                      # Componentes UI adicionales
│
├── store/                        # Redux Store
│   ├── index.ts                 # Configuración del store y persistencia
│   ├── hooks.ts                 # Hooks tipados (useAppDispatch, useAppSelector)
│   ├── slices/                  # Redux Slices
│   │   ├── waterSlice.ts        # Estado de hidratación
│   │   └── themeSlice.ts        # Estado del tema
│   └── api/                     # RTK Query APIs
│       ├── baseApi.ts           # API base de RTK Query
│       └── waterApi.ts          # Endpoints de hidratación
│
├── hooks/                        # Custom hooks
│   ├── use-deep-linking.ts      # Hook para manejar deep links
│   ├── use-first-launch.ts      # Hook para detectar primer lanzamiento
│   ├── use-color-scheme.ts      # Hook para detectar tema del sistema
│   └── use-theme-color.ts       # Hook para colores del tema
│
├── utils/                        # Utilidades
│   └── linking.ts               # Configuración y utilidades de deep linking
│
├── constants/                    # Constantes
│   └── theme.ts                 # Tema y colores
│
├── __tests__/                    # Tests
│   ├── store/                   # Tests de Redux
│   │   ├── api/
│   │   │   └── waterApi.test.ts
│   │   └── slices/
│   │       ├── themeSlice.test.ts
│   │       └── waterSlice.test.ts
│   ├── components/              # Tests de componentes
│   │   └── design-system/
│   │       ├── Badge.test.tsx
│   │       ├── Button.test.tsx
│   │       └── Card.test.tsx
│   └── utils/                   # Tests de utilidades
│       └── linking.test.ts
│
├── docs/                         # Documentación adicional
│   ├── ARCHITECTURE.md          # Arquitectura del proyecto
│   ├── DESIGN_SYSTEM.md         # Sistema de diseño
│   ├── REDUX.md                 # Guía de Redux
│   └── DEEP_LINKING.md          # Guía de deep linking
│
├── jest.config.js               # Configuración de Jest
├── jest.setup.js                # Setup de Jest y mocks
├── tsconfig.json                # Configuración de TypeScript
├── app.json                     # Configuración de Expo
└── package.json                 # Dependencias y scripts
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm start              # Iniciar servidor de desarrollo
npm run android        # Ejecutar en Android
npm run ios            # Ejecutar en iOS
npm run web            # Ejecutar en web

# Testing
npm test               # Ejecutar todos los tests
npm run test:watch     # Modo watch (re-ejecuta al cambiar archivos)
npm run test:coverage  # Ejecutar con reporte de cobertura

# Linting
npm run lint           # Ejecutar ESLint

# Builds (requiere EAS CLI)
npm run build:android  # Build para Android
npm run build:ios      # Build para iOS
npm run build:all      # Build para ambas plataformas
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Modo watch
npm run test:watch

# Con cobertura
npm run test:coverage
```

### Estructura de Tests

Los tests están organizados por tipo:

- **Unit Tests**: Slices de Redux, utilidades
- **Component Tests**: Componentes del design system
- **Integration Tests**: Flujos completos (futuro)

### Ejemplo de Test

```typescript
// __tests__/store/slices/waterSlice.test.ts
import waterReducer, { addGlass } from '@/store/slices/waterSlice';

describe('waterSlice', () => {
  it('should increment glasses', () => {
    const state = { glasses: 0, goal: 12 };
    const newState = waterReducer(state, addGlass());
    expect(newState.glasses).toBe(1);
  });
});
```

## 📚 Documentación Adicional

El proyecto incluye documentación detallada en la carpeta `docs/`:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arquitectura completa del proyecto
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - Guía del sistema de diseño
- **[REDUX.md](docs/REDUX.md)** - Guía completa de Redux Toolkit y RTK Query
- **[DEEP_LINKING.md](docs/DEEP_LINKING.md)** - Guía de deep linking

## 🎯 Características Destacadas

### 1. Gestión de Estado Robusta
- Redux Toolkit para estado global
- RTK Query para datos remotos con cache
- Redux Persist para persistencia

### 2. Testing Completo
- Tests unitarios para slices
- Tests de componentes con Testing Library
- Configuración de mocks para dependencias

### 3. Deep Linking Completo
- Soporte para navegación
- Soporte para acciones (agregar vaso)
- Configuración para iOS y Android

### 4. Sistema de Diseño Escalable
- Componentes reutilizables
- Variantes y tamaños consistentes
- Soporte para modo oscuro/claro

### 5. Navegación Moderna
- File-based routing con Expo Router
- Navegación por tabs
- Stack navigation para modales

## 🚀 Próximos Pasos

Posibles mejoras futuras:

- [ ] Notificaciones push para recordatorios
- [ ] Sincronización con backend real
- [ ] Gráficos avanzados de estadísticas
- [ ] Widgets para home screen
- [ ] Integración con Apple Health / Google Fit
- [ ] Modo offline completo
- [ ] Internacionalización (i18n)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado como demostración de tecnologías modernas para desarrollo móvil con React Native.

 
---

**Nota:** Este proyecto utiliza JSONPlaceholder como API de ejemplo. En producción, reemplaza la URL base en `store/api/baseApi.ts` con tu API real.
