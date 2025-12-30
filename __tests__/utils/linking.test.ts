import { parseDeepLink, createDeepLink } from '@/utils/linking';
import * as Linking from 'expo-linking';

// Mock de expo-linking
jest.mock('expo-linking', () => ({
  parse: jest.fn(),
}));

describe('linking utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseDeepLink', () => {
    it('should parse home route', () => {
      (Linking.parse as jest.Mock).mockReturnValue({
        path: 'home',
        queryParams: {},
      });

      const result = parseDeepLink('bebeagua://home');
      expect(result).toEqual({ route: '/(tabs)', params: {} });
    });

    it('should parse config route', () => {
      (Linking.parse as jest.Mock).mockReturnValue({
        path: 'config',
        queryParams: {},
      });

      const result = parseDeepLink('bebeagua://config');
      expect(result).toEqual({ route: '/(tabs)/configuration', params: {} });
    });

    it('should parse stats route', () => {
      (Linking.parse as jest.Mock).mockReturnValue({
        path: 'stats',
        queryParams: {},
      });

      const result = parseDeepLink('bebeagua://stats');
      expect(result).toEqual({ route: '/(tabs)/stats', params: {} });
    });

    it('should parse route with params', () => {
      (Linking.parse as jest.Mock).mockReturnValue({
        path: 'home',
        queryParams: { action: 'add-glass' },
      });

      const result = parseDeepLink('bebeagua://home?action=add-glass');
      expect(result).toEqual({
        route: '/(tabs)',
        params: { action: 'add-glass' },
      });
    });

    it('should return null for invalid URL', () => {
      (Linking.parse as jest.Mock).mockReturnValue({
        path: null,
        queryParams: {},
      });

      const result = parseDeepLink('invalid-url');
      expect(result).toBeNull();
    });
  });

  describe('createDeepLink', () => {
    it('should create home deep link', () => {
      const result = createDeepLink('/(tabs)');
      expect(result).toBe('bebeagua://home');
    });

    it('should create config deep link', () => {
      const result = createDeepLink('/(tabs)/configuration');
      expect(result).toBe('bebeagua://config');
    });

    it('should create deep link with params', () => {
      const result = createDeepLink('/(tabs)', { action: 'add-glass' });
      expect(result).toBe('bebeagua://home?action=add-glass');
    });

    it('should handle unknown routes', () => {
      const result = createDeepLink('/unknown-route');
      expect(result).toBe('bebeagua://unknown-route');
    });
  });
});

