# Guía de Deep Linking

## Introducción

La aplicación soporta deep linking para permitir la navegación y acciones desde URLs externas. El scheme de la app es `bebeagua://`.

## Configuración

### app.json

El deep linking está configurado en `app.json`:

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

### Configuración de Rutas

Las rutas están mapeadas en `utils/linking.ts`:

```typescript
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

## Deep Links Disponibles

### Navegación

#### Home
```
bebeagua://home
```
Navega a la pantalla principal.

#### Configuración
```
bebeagua://config
```
Navega a la pantalla de configuración.

#### Estadísticas
```
bebeagua://stats
```
Navega a la pantalla de estadísticas.

#### Welcome
```
bebeagua://welcome
```
Navega a la pantalla de bienvenida.

### Acciones

#### Agregar Vaso
```
bebeagua://home?action=add-glass
```
Agrega un vaso de agua y navega a home.

## Implementación

### Hook useDeepLinking

El hook `useDeepLinking` está configurado en `app/_layout.tsx` y maneja automáticamente los deep links:

```typescript
import { useDeepLinking } from '@/hooks/use-deep-linking';

function RootLayoutContent() {
  useDeepLinking(); // Maneja deep links automáticamente
  // ...
}
```

### Funciones Utilitarias

#### parseDeepLink

Parsea una URL y devuelve la ruta y parámetros:

```typescript
import { parseDeepLink } from '@/utils/linking';

const result = parseDeepLink('bebeagua://home?action=add-glass');
// { route: '/(tabs)', params: { action: 'add-glass' } }
```

#### createDeepLink

Crea una URL de deep link a partir de una ruta:

```typescript
import { createDeepLink } from '@/utils/linking';

const url = createDeepLink('/(tabs)', { action: 'add-glass' });
// 'bebeagua://home?action=add-glass'
```

## Uso en Desarrollo

### iOS Simulator

```bash
xcrun simctl openurl booted "bebeagua://home"
```

### Android Emulator

```bash
adb shell am start -W -a android.intent.action.VIEW -d "bebeagua://home" com.bebeagua.app
```

### Expo Go

En Expo Go, puedes probar deep links usando:

```bash
npx uri-scheme open bebeagua://home --ios
npx uri-scheme open bebeagua://home --android
```

## Testing

Los deep links se pueden testear:

```typescript
import { parseDeepLink, createDeepLink } from '@/utils/linking';

describe('Deep Linking', () => {
  it('should parse home route', () => {
    const result = parseDeepLink('bebeagua://home');
    expect(result.route).toBe('/(tabs)');
  });

  it('should create deep link', () => {
    const url = createDeepLink('/(tabs)');
    expect(url).toBe('bebeagua://home');
  });
});
```

## Agregar Nuevos Deep Links

### 1. Agregar Ruta en linking.ts

```typescript
export const linking = {
  config: {
    screens: {
      '(tabs)': {
        screens: {
          // ... rutas existentes
          newScreen: 'new-route', // Nueva ruta
        },
      },
    },
  },
};
```

### 2. Agregar Mapeo en parseDeepLink

```typescript
const routeMap: Record<string, string> = {
  'home': '/(tabs)',
  'new-route': '/(tabs)/newScreen', // Nuevo mapeo
};
```

### 3. Manejar Acción en useDeepLinking

```typescript
if (params?.action === 'new-action') {
  // Manejar nueva acción
  dispatch(newAction());
  router.push('/(tabs)/newScreen');
}
```

## Universal Links (iOS) y App Links (Android)

Para producción, configura Universal Links (iOS) y App Links (Android):

### iOS (Universal Links)

1. Configurar Associated Domains en Xcode
2. Agregar archivo `.well-known/apple-app-site-association` en tu servidor
3. Verificar que el dominio esté verificado

### Android (App Links)

1. Configurar intent filters en `app.json`
2. Agregar archivo `.well-known/assetlinks.json` en tu servidor
3. Verificar dominio en Google Search Console

## Troubleshooting

### Deep Link No Funciona

1. Verificar que el scheme esté configurado en `app.json`
2. Verificar que la app esté instalada (no funciona en Expo Go para schemes personalizados)
3. Verificar los logs de la app para errores

### Parámetros No Se Reciben

1. Verificar el formato de la URL
2. Verificar que `parseDeepLink` esté parseando correctamente
3. Agregar logs para debug

## Recursos

- [Expo Linking Docs](https://docs.expo.dev/guides/linking/)
- [React Navigation Deep Linking](https://reactnavigation.org/docs/deep-linking/)
- [iOS Universal Links](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)
- [Android App Links](https://developer.android.com/training/app-links)

