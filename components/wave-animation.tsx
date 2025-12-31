import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const { width } = Dimensions.get('window');

// Parámetros de las olas
const WAVE_HEIGHT = 100;
const WAVE_WIDTH = width * 2;
const WAVE_SEGMENTS = 100; // Número de segmentos para formar la onda
const SEGMENT_WIDTH = WAVE_WIDTH / WAVE_SEGMENTS;

interface WaveSegmentProps {
  index: number;
  translateX: SharedValue<number>;
  offsetX: number;
  color: string;
  opacity: number;
  amplitude: number;
  frequency: number;
}

function WaveSegment({ index, translateX, offsetX, color, opacity, amplitude, frequency }: WaveSegmentProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const x = index * SEGMENT_WIDTH;
    const baseX = translateX.value + offsetX - WAVE_WIDTH + x;
    const normalizedX = (baseX % WAVE_WIDTH) / WAVE_WIDTH;
    const waveY = Math.sin(normalizedX * Math.PI * 3 * frequency) * amplitude;
    
    return {
      transform: [
        { translateX: baseX },
        { translateY: -waveY },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.waveSegment,
        animatedStyle,
        {
          backgroundColor: color,
          opacity,
          left: index * SEGMENT_WIDTH,
        },
      ]}
    />
  );
}

interface WaveProps {
  offsetX: number;
  color: string;
  opacity: number;
  speed: number;
  bottomOffset: number;
  amplitude: number;
  frequency: number;
}

function Wave({ offsetX, color, opacity, speed, bottomOffset, amplitude, frequency }: WaveProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(WAVE_WIDTH, {
        duration: speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [speed, translateX]);

  return (
    <View style={[styles.waveContainer, { bottom: bottomOffset }]}>
      {Array.from({ length: WAVE_SEGMENTS }, (_, i) => (
        <WaveSegment
          key={i}
          index={i}
          translateX={translateX}
          offsetX={offsetX}
          color={color}
          opacity={opacity}
          amplitude={amplitude}
          frequency={frequency}
        />
      ))}
    </View>
  );
}

export default function WaveAnimation() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  // Colores para las olas según el tema
  const waveColors =
    colorScheme === 'dark'
      ? [Colors.dark.waterLight, Colors.dark.water, Colors.dark.waterDark]
      : [Colors.light.waterLight, Colors.light.water, Colors.light.bubble];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Onda 1 - Más lenta y transparente, más abajo */}
      <Wave
        offsetX={0}
        color={waveColors[0]}
        opacity={0.4}
        speed={12000}
        bottomOffset={0}
        amplitude={25}
        frequency={2}
      />
      {/* Onda 2 - Media velocidad, medio */}
      <Wave
        offsetX={-WAVE_WIDTH / 3}
        color={waveColors[1]}
        opacity={0.5}
        speed={10000}
        bottomOffset={15}
        amplitude={30}
        frequency={2.5}
      />
      {/* Onda 3 - Más rápida, más arriba */}
      <Wave
        offsetX={-WAVE_WIDTH / 2}
        color={waveColors[2]}
        opacity={0.3}
        speed={8000}
        bottomOffset={30}
        amplitude={20}
        frequency={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
  },
  waveContainer: {
    position: 'absolute',
    left: 0,
    width: WAVE_WIDTH * 100,
    height: WAVE_HEIGHT,
  },
  waveSegment: {
    position: 'absolute',
    width: SEGMENT_WIDTH * 2, // +2 para que se superpongan ligeramente
    height: WAVE_HEIGHT * 10,
    borderRadius: 30,
  },
});
