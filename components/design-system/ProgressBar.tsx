import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
import { Colors } from '@/constants/theme';
import { designSystemStyles } from './styles';
import { BaseComponentProps } from './types';

interface ProgressBarProps extends BaseComponentProps {
  progress: number; // 0-100
  height?: number;
  showLabel?: boolean;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  height = 8,
  showLabel = false,
  color = Colors.light.tint,
  backgroundColor = Colors.light.backgroundSecondary,
  animated = true,
  style,
  testID,
  accessibilityLabel,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: clampedProgress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(clampedProgress);
    }
  }, [clampedProgress, animated, animatedValue]);

  const width = animated
    ? animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      })
    : `${clampedProgress}%`;

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `Progreso: ${Math.round(clampedProgress)}%`}
      accessibilityValue={{ now: clampedProgress, min: 0, max: 100 }}
      accessibilityRole="progressbar"
    >
      <View style={[styles.track, { height, backgroundColor }]}>
        {animated ? (
          <Animated.View
            style={[
              styles.fill,
              {
                width,
                height,
                backgroundColor: color,
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.fill,
              {
                width: `${clampedProgress}%`,
                height,
                backgroundColor: color,
              },
            ]}
          />
        )}
      </View>
      {showLabel && (
        <Text style={styles.label}>{Math.round(clampedProgress)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    borderRadius: designSystemStyles.borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: designSystemStyles.borderRadius.full,
  },
  label: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: designSystemStyles.spacing.xs,
    textAlign: 'right',
  },
});

