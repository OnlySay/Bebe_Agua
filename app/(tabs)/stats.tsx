import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Body from '@/components/body';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetUserQuery, useGetWaterStatsQuery } from '@/store/api/waterApi';

import { IconSymbol } from '@/components/ui/icon-symbol.ios';
import { useUser } from '@/hooks/use-user';

export default function StatsScreen() {
  // Usar RTK Query hooks

  const bgCard = useThemeColor({ light: Colors.light.card, dark: Colors.dark.card }, 'card');

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useGetWaterStatsQuery();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(1); // Obtener usuario con ID 1

  const {
    name,
    age,
    email,
    phone,
  } = useUser();

  if (statsLoading || userLoading) {
    return (
      <Body>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <ThemedText type="default" style={styles.loadingText}>
            Cargando estadísticas...
          </ThemedText>
        </View>
      </Body>
    );
  }

  if (statsError || userError) {
    return (
      <Body>
        <View style={styles.centerContainer}>
          <ThemedText type="title" style={styles.errorText}>
            Error al cargar datos
          </ThemedText>
          <ThemedText type="default">
            {statsError || userError ? 'Error: ' + JSON.stringify(statsError || userError) : ''}
          </ThemedText>
        </View>
      </Body>
    );
  }

  return (
    <Body>
      <ScrollView>
        <ThemedText type="title" style={styles.title}>
          Estadísticas de Hidratación
        </ThemedText>

        {user && (
          <View style={[styles.userCard, { backgroundColor: bgCard }]}>
            <ThemedText type="subtitle">Usuario</ThemedText>
            <ThemedText type="default">Nombre: {name}</ThemedText>
            <ThemedText type="default">Edad: {age}</ThemedText>
            <ThemedText type="default">Email: {email}</ThemedText>
            <ThemedText type="default">Teléfono: {phone}</ThemedText>
          </View>
        )}

        {stats && stats.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statsHeader}  >
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Historial (Últimos {stats.length} días)
              </ThemedText>
              <TouchableOpacity onPress={() => refetchStats()}>
                <IconSymbol name="arrow.clockwise.circle.fill" size={24} />
              </TouchableOpacity>
            </View>
            {stats.map((stat) => (
              <View key={stat.id} style={[styles.statCard, { backgroundColor: bgCard }]}>
                <ThemedText type="default" style={styles.statDate}>
                  {new Date(stat.date).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </ThemedText>
                <View style={styles.statRow}>
                  <ThemedText type="default">
                    Vasos: {stat.glasses}/{stat.goal}
                  </ThemedText>
                  <ThemedText type="default" style={styles.percentage}>
                    {stat.percentage}%
                  </ThemedText>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${Math.min(stat.percentage, 100)}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {stats && stats.length === 0 && (
          <View style={styles.centerContainer}>
            <ThemedText type="default">No hay estadísticas disponibles</ThemedText>
          </View>
        )}
      </ScrollView>
    </Body>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    marginTop: 16,
  },
  errorText: {
    color: Colors.light.danger,
  },
  userCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  statsContainer: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  statDate: {
    fontWeight: '600',
    marginBottom: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentage: {
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
});

