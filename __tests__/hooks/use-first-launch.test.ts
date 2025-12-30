import { useFirstLaunch } from '@/hooks/use-first-launch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, waitFor } from '@testing-library/react-native';

const TUTORIAL_SEEN_KEY = '@bebe_agua:tutorial_seen';

describe('useFirstLaunch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Limpiar AsyncStorage antes de cada test
    AsyncStorage.clear();
  });

  it('should return isLoading true initially', () => {
    const { result } = renderHook(() => useFirstLaunch());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFirstLaunch).toBe(null);
  });

  it('should detect first launch when tutorial not seen', async () => {
    // Asegurar que no existe la clave
    await AsyncStorage.removeItem(TUTORIAL_SEEN_KEY);

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFirstLaunch).toBe(true);
  });

  it('should detect not first launch when tutorial was seen', async () => {
    // Simular que el tutorial ya fue visto
    await AsyncStorage.setItem(TUTORIAL_SEEN_KEY, 'true');

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFirstLaunch).toBe(false);
  });

  it('should mark tutorial as seen', async () => {
    await AsyncStorage.removeItem(TUTORIAL_SEEN_KEY);

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFirstLaunch).toBe(true);

    await result.current.markTutorialAsSeen();

    expect(result.current.isFirstLaunch).toBe(false);
    
    const storedValue = await AsyncStorage.getItem(TUTORIAL_SEEN_KEY);
    expect(storedValue).toBe('true');
  });

  it('should reset tutorial', async () => {
    // Primero marcar como visto
    await AsyncStorage.setItem(TUTORIAL_SEEN_KEY, 'true');

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isFirstLaunch).toBe(false);

    await result.current.resetTutorial();

    expect(result.current.isFirstLaunch).toBe(true);
    
    const storedValue = await AsyncStorage.getItem(TUTORIAL_SEEN_KEY);
    expect(storedValue).toBeNull();
  });

  it('should handle AsyncStorage errors gracefully', async () => {
    // Mock AsyncStorage.getItem para que falle
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Debería fallar de forma segura y considerar que NO es first launch
    expect(result.current.isFirstLaunch).toBe(false);
  });

  it('should handle markTutorialAsSeen errors gracefully', async () => {
    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage error'));
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.markTutorialAsSeen();

    // No debería lanzar error, solo loggearlo
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('should handle resetTutorial errors gracefully', async () => {
    jest.spyOn(AsyncStorage, 'removeItem').mockRejectedValueOnce(new Error('Storage error'));
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useFirstLaunch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.resetTutorial();

    // No debería lanzar error, solo loggearlo
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
