import { useThemeColor } from '@/hooks/use-theme-color';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const color = useThemeColor({}, 'tint');
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
