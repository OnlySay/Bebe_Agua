import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BaseComponentProps } from './types';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends BaseComponentProps {
  options: SelectOption[];
  value?: string | number;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  label?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Selecciona una opción',
  containerStyle,
  label,
  testID,
  accessibilityLabel,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Colores dinámicos según el tema
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'textSecondary');

  const handleSelect = (optionValue: string | number) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={[styles.wrapper, containerStyle]} testID={testID}>
      {label && (
        <ThemedText type="defaultSemiBold" style={styles.label} accessibilityLabel={accessibilityLabel || label}>
          {label}
        </ThemedText>
      )}
      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            backgroundColor,
            borderColor: borderColor + '40',
          },
        ]}
        onPress={() => setIsOpen(true)}
        accessibilityLabel={accessibilityLabel || displayText}
        accessibilityRole="button"
      >
        <ThemedText type="default" style={styles.selectText}>
          {displayText}
        </ThemedText>
        <ThemedText type="default" style={styles.arrow}>
          ▼
        </ThemedText>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
        style={{ backgroundColor }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <ThemedView style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              {label || 'Selecciona una opción'}
            </ThemedText>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <TouchableOpacity
                  key={String(option.value)}
                  style={[
                    styles.modalOption,
                    {
                      borderBottomColor: borderColor + '20',
                    },
                  ]}
                  onPress={() => handleSelect(option.value)}
                >
                  <ThemedText type="default">{option.label}</ThemedText>
                  {isSelected && (
                    <ThemedText type="default" style={[styles.checkmark, { color: tintColor }]}>
                      ✓
                    </ThemedText>
                  )}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setIsOpen(false)}
            >
              <ThemedText type="default">Cancelar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </TouchableOpacity>
      </Modal>
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
    marginBottom: 4,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
  },
  selectText: {
    flex: 1,
  },
  arrow: {
    opacity: 0.5,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  checkmark: {
    fontWeight: 'bold',
  },
  modalCancel: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
});

