// Tipos compartidos para el sistema de diseño

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BaseComponentProps {
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

