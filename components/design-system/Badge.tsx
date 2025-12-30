import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, HydrationLevels } from '@/constants/theme';
import { designSystemStyles } from './styles';
import { BadgeVariant, BaseComponentProps } from './types';

interface BadgeProps extends BaseComponentProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'default',
  size = 'medium',
  style,
  testID,
  accessibilityLabel,
}: BadgeProps) {
  const badgeStyle = [
    styles.badge,
    styles[`badge_${variant}`],
    styles[`badge_${size}`],
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
  ];

  return (
    <View
      style={badgeStyle}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="text"
    >
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: designSystemStyles.borderRadius.full,
    paddingHorizontal: designSystemStyles.spacing.sm,
    paddingVertical: designSystemStyles.spacing.xs,
  },
  badge_default: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  badge_success: {
    backgroundColor: Colors.light.success + '20',
  },
  badge_warning: {
    backgroundColor: Colors.light.warning + '20',
  },
  badge_error: {
    backgroundColor: Colors.light.danger + '20',
  },
  badge_info: {
    backgroundColor: Colors.light.tint + '20',
  },
  badge_small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badge_medium: {
    paddingHorizontal: designSystemStyles.spacing.sm,
    paddingVertical: designSystemStyles.spacing.xs,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  text_default: {
    color: Colors.light.text,
  },
  text_success: {
    color: Colors.light.success,
  },
  text_warning: {
    color: Colors.light.warning,
  },
  text_error: {
    color: Colors.light.danger,
  },
  text_info: {
    color: Colors.light.tint,
  },
  text_small: {
    fontSize: 10,
  },
  text_medium: {
    fontSize: 12,
  },
});

