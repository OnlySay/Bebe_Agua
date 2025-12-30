import { renderHook, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useDeepLinking } from '@/hooks/use-deep-linking';
import { parseDeepLink } from '@/utils/linking';
import waterReducer from '@/store/slices/waterSlice';

// Mock de parseDeepLink
jest.mock('@/utils/linking', () => ({
  parseDeepLink: jest.fn(),
}));

// Mock de expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock de expo-linking
const mockEventListener = jest.fn();
const mockRemoveListener = jest.fn();
const mockGetInitialURL = jest.fn();

jest.mock('expo-linking', () => ({
  addEventListener: jest.fn(() => ({
    remove: mockRemoveListener,
  })),
  getInitialURL: jest.fn(() => Promise.resolve(null)),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      water: waterReducer,
    },
    preloadedState: {
      water: {
        glasses: 0,
        goal: 12,
        ...initialState,
      },
    },
  });
};

const wrapper = ({ children, store }: { children: React.ReactNode; store: any }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useDeepLinking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEventListener.mockImplementation((event, callback) => {
      return { remove: mockRemoveListener };
    });
    (Linking.addEventListener as jest.Mock).mockImplementation((event, callback) => {
      mockEventListener(event, callback);
      return { remove: mockRemoveListener };
    });
    (Linking.getInitialURL as jest.Mock).mockResolvedValue(null);
  });

  it('should set up event listener on mount', () => {
    const store = createMockStore();
    renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(Linking.addEventListener).toHaveBeenCalledWith('url', expect.any(Function));
  });

  it('should check initial URL on mount', () => {
    const store = createMockStore();
    renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    expect(Linking.getInitialURL).toHaveBeenCalled();
  });

  it('should handle add-glass action from deep link', async () => {
    const store = createMockStore();
    const initialState = store.getState();
    
    (parseDeepLink as jest.Mock).mockReturnValue({
      route: '/(tabs)',
      params: { action: 'add-glass' },
    });

    let deepLinkCallback: ((event: { url: string }) => void) | null = null;
    (Linking.addEventListener as jest.Mock).mockImplementation((event, callback) => {
      deepLinkCallback = callback;
      return { remove: mockRemoveListener };
    });

    renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    // Simular un deep link
    if (deepLinkCallback) {
      deepLinkCallback({ url: 'bebeagua://home?action=add-glass' });
    }

    await waitFor(() => {
      const state = store.getState();
      expect(state.water.glasses).toBe(1);
    });

    expect(router.push).toHaveBeenCalledWith('/(tabs)');
  });

  it('should navigate to route from deep link', async () => {
    const store = createMockStore();
    
    (parseDeepLink as jest.Mock).mockReturnValue({
      route: '/(tabs)/stats',
      params: {},
    });

    let deepLinkCallback: ((event: { url: string }) => void) | null = null;
    (Linking.addEventListener as jest.Mock).mockImplementation((event, callback) => {
      deepLinkCallback = callback;
      return { remove: mockRemoveListener };
    });

    renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    // Simular un deep link
    if (deepLinkCallback) {
      deepLinkCallback({ url: 'bebeagua://stats' });
    }

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/(tabs)/stats');
    });
  });

  it('should ignore invalid deep links', () => {
    const store = createMockStore();
    
    (parseDeepLink as jest.Mock).mockReturnValue(null);

    let deepLinkCallback: ((event: { url: string }) => void) | null = null;
    (Linking.addEventListener as jest.Mock).mockImplementation((event, callback) => {
      deepLinkCallback = callback;
      return { remove: mockRemoveListener };
    });

    renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    // Simular un deep link inválido
    if (deepLinkCallback) {
      deepLinkCallback({ url: 'invalid-url' });
    }

    // No debería navegar ni hacer nada
    expect(router.push).not.toHaveBeenCalled();
  });

  it('should handle initial URL deep link', async () => {
    const store = createMockStore();
    
    (parseDeepLink as jest.Mock).mockReturnValue({
      route: '/(tabs)',
      params: { action: 'add-glass' },
    });

    (Linking.getInitialURL as jest.Mock).mockResolvedValue('bebeagua://home?action=add-glass');

    renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.water.glasses).toBe(1);
    });
  });

  it('should cleanup event listener on unmount', () => {
    const store = createMockStore();
    const { unmount } = renderHook(() => useDeepLinking(), {
      wrapper: ({ children }) => wrapper({ children, store }),
    });

    unmount();

    expect(mockRemoveListener).toHaveBeenCalled();
  });
});
