import * as Linking from 'expo-linking';

// Configuración de deep linking
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

// Función helper para parsear deep links
export function parseDeepLink(url: string): { route: string; params?: Record<string, string> } | null {
  try {
    const parsed = Linking.parse(url);
    
    if (!parsed.path) {
      return null;
    }

    // Mapear rutas de deep links a rutas de la app
    const routeMap: Record<string, string> = {
      'home': '/(tabs)',
      'config': '/(tabs)/configuration',
      'stats': '/(tabs)/stats',
      'welcome': '/welcome',
    };

    const route = routeMap[parsed.path] || parsed.path;
    const params = parsed.queryParams || {};

    return { route, params };
  } catch (error) {
    console.error('Error parsing deep link:', error);
    return null;
  }
}

// Función helper para crear deep links
export function createDeepLink(route: string, params?: Record<string, string>): string {
  const baseUrl = 'bebeagua://';
  
  // Mapear rutas de la app a deep links
  const routeMap: Record<string, string> = {
    '/(tabs)': 'home',
    '/(tabs)/configuration': 'config',
    '/(tabs)/stats': 'stats',
    '/welcome': 'welcome',
  };

  const deepLinkRoute = routeMap[route] || route.replace(/^\//, '');
  
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}${deepLinkRoute}?${queryString}`;
  }
  
  return `${baseUrl}${deepLinkRoute}`;
}

