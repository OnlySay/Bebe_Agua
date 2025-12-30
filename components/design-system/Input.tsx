import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { BaseComponentProps } from './types';

interface InputProps extends TextInputProps, BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  testID,
  accessibilityLabel,
  ...textInputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const backgroundColor = useThemeColor({}, 'background');
  
  const inputContainerStyle = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
    containerStyle,
  ];

  return (
    <View style={[styles.wrapper]} testID={testID}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
      <View style={[inputContainerStyle, { backgroundColor }]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            style,
            { color: textColor},
          ]}
          placeholderTextColor={textSecondaryColor + '80'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={accessibilityLabel || label}
          {...textInputProps}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>}
      {helperText && !error && <Text style={[styles.helperText, { color: textColor }]}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.textSecondary + '40',
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    minHeight: 44,
  },
  inputContainerFocused: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: Colors.light.danger,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputWithLeftIcon: {
    paddingLeft: 4,
  },
  inputWithRightIcon: {
    paddingRight: 4,
  },
  leftIcon: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  rightIcon: {
    paddingRight: 16,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: Colors.light.danger,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
});

