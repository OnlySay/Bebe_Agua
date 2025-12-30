# Arquitectura del Proyecto

## Visión General

Este proyecto es una aplicación React Native desarrollada con Expo que demuestra la integración de tecnologías modernas para el desarrollo móvil. La aplicación permite a los usuarios rastrear su consumo diario de agua.

## Stack Tecnológico

### Core
- **React Native** (0.81.5) - Framework para desarrollo móvil multiplataforma
- **Expo** (~54.0.29) - Plataforma y herramientas para desarrollo React Native
- **TypeScript** (5.9.2) - Tipado estático para JavaScript

### Estado y Datos
- **Redux Toolkit** (2.0.0) - Gestión de estado global
- **RTK Query** - Fetching y caching de datos
- **Redux Persist** (6.0.0) - Persistencia del estado

### Navegación
- **React Navigation** (7.x) - Sistema de navegación
- **Expo Router** (6.0.19) - Enrutamiento basado en archivos

### Testing
- **Jest** (29.7.0) - Framework de testing
- **Testing Library** (12.4.0) - Utilidades para testing de componentes

### Deep Linking
- **Expo Linking** (8.0.10) - Manejo de deep links

## Estructura de Carpetas

```
bebe_agua/
├── app/                    # Pantallas (Expo Router)
│   ├── _layout.tsx         # Layout raíz con Redux Provider
│   ├── (tabs)/            # Navegación por tabs
│   │   ├── index.tsx      # Pantalla principal
│   │   ├── configuration.tsx # Configuración
│   │   └── stats.tsx      # Estadísticas (RTK Query)
│   └── welcome.tsx        # Pantalla de bienvenida
├── components/            # Componentes reutilizables
│   ├── design-system/     # Sistema de diseño
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Modal.tsx
│   └── [otros componentes]
├── store/                 # Redux Store
│   ├── index.ts           # Configuración del store
│   ├── hooks.ts           # Hooks tipados
│   ├── slices/            # Redux Slices
│   │   ├── waterSlice.ts
│   │   └── themeSlice.ts
│   └── api/               # RTK Query APIs
│       ├── baseApi.ts
│       └── waterApi.ts
├── hooks/                 # Custom hooks
│   ├── use-deep-linking.ts
│   └── [otros hooks]
├── utils/                 # Utilidades
│   └── linking.ts         # Configuración de deep linking
├── constants/             # Constantes
│   └── theme.ts           # Tema y colores
└── __tests__/             # Tests
    ├── store/
    ├── components/
    └── utils/
```

## Flujo de Datos

### Redux Store

El estado global está gestionado por Redux Toolkit con los siguientes slices:

1. **waterSlice**: Estado de hidratación (vasos, objetivo)
2. **themeSlice**: Estado del tema (modo oscuro/claro)

### RTK Query

RTK Query maneja las peticiones a APIs externas:
- **waterApi**: Endpoints para estadísticas de hidratación
- Cache automático y refetch inteligente

### Persistencia

Redux Persist persiste automáticamente:
- Estado de agua (vasos, objetivo)
- Configuración del tema

## Navegación

La aplicación usa Expo Router con navegación por tabs:
- **Home**: Pantalla principal con el vaso de agua
- **Configuración**: Ajustes de la app
- **Estadísticas**: Historial y datos (RTK Query)

## Deep Linking

La app soporta deep links con el scheme `bebeagua://`:
- `bebeagua://home` - Navegar a home
- `bebeagua://config` - Navegar a configuración
- `bebeagua://stats` - Navegar a estadísticas
- `bebeagua://add-glass?action=add-glass` - Agregar vaso

## Sistema de Diseño

Componentes reutilizables en `components/design-system/`:
- **Button**: Botones con variantes (primary, secondary, outline, ghost)
- **Card**: Tarjetas con variantes (default, elevated, outlined)
- **Input**: Campos de texto con validación
- **Badge**: Badges con variantes de color
- **ProgressBar**: Barras de progreso animadas
- **Modal**: Modales reutilizables

## Testing

Tests organizados por tipo:
- **Unit Tests**: Slices de Redux, utilidades
- **Component Tests**: Componentes del design system
- **Integration Tests**: Flujos completos

Ejecutar tests:
```bash
npm test              # Ejecutar todos los tests
npm run test:watch    # Modo watch
npm run test:coverage # Con cobertura
```

## Mejoras Futuras

- [ ] Notificaciones push
- [ ] Sincronización con backend real
- [ ] Gráficos avanzados de estadísticas
- [ ] Widgets para home screen
- [ ] Integración con Apple Health / Google Fit

