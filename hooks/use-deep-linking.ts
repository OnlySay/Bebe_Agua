import { useAppDispatch } from '@/store/hooks';
import { addGlass } from '@/store/slices/waterSlice';
import { parseDeepLink } from '@/utils/linking';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';

export function useDeepLinking() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Manejar deep links cuando la app está abierta
    const handleDeepLink = (event: { url: string }) => {
      const parsed = parseDeepLink(event.url);
      
      if (!parsed) {
        return;
      }

      const { route, params } = parsed;

      // Manejar acciones especiales
      if (params?.action === 'add-glass') {
        dispatch(addGlass());
        // Navegar a home después de agregar el vaso
        router.push('/(tabs)');
        return;
      }

      // Navegar a la ruta especificada
      if (route) {
        router.push(route as any);
      }
    };

    // Escuchar deep links cuando la app está abierta
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Manejar deep link inicial si la app se abrió desde un link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [dispatch]);
}

