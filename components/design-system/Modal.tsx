import React, { useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/theme';
import { designSystemStyles } from './styles';
import { BaseComponentProps } from './types';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  contentStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

export function Modal({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  animationType = 'slide',
  transparent = true,
  contentStyle,
  containerStyle,
  testID,
  accessibilityLabel,
}: ModalProps) {
  useEffect(() => {
    if (Platform.OS === 'web' && visible) {
      // Prevenir scroll del body en web cuando el modal está abierto
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [visible]);

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, containerStyle]}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={[styles.content, contentStyle]}>
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title && <Text style={styles.title}>{title}</Text>}
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={styles.closeButton}
                      accessibilityLabel="Cerrar modal"
                      accessibilityRole="button"
                    >
                      <IconSymbol name="xmark.circle.fill" size={24} color={Colors.light.textSecondary} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.body}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: designSystemStyles.spacing.lg,
  },
  content: {
    backgroundColor: Colors.light.background,
    borderRadius: designSystemStyles.borderRadius.xl,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    ...designSystemStyles.shadowLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: designSystemStyles.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.textSecondary + '20',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
  },
  closeButton: {
    padding: designSystemStyles.spacing.xs,
  },
  body: {
    padding: designSystemStyles.spacing.md,
  },
});

