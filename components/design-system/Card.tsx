import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';
import { designSystemStyles } from './styles';
import { BaseComponentProps } from './types';

interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding = 'medium',
  style,
  testID,
  accessibilityLabel,
  accessibilityRole = 'none',
}: CardProps) {
  const cardStyle = [
    styles.card,
    styles[`card_${variant}`],
    styles[`padding_${padding}`],
    style,
  ];

  return (
    <View
      style={cardStyle}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: designSystemStyles.borderRadius.lg,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  card_default: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  card_elevated: {
    ...designSystemStyles.shadowLarge,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  card_outlined: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.light.textSecondary + '20',
  },
  padding_none: {
    padding: 0,
  },
  padding_small: {
    padding: designSystemStyles.spacing.sm,
  },
  padding_medium: {
    padding: designSystemStyles.spacing.md,
  },
  padding_large: {
    padding: designSystemStyles.spacing.lg,
  },
});

