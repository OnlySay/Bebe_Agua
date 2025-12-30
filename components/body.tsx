import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedRef
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { PropsWithChildren } from 'react';


const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}>;

export default function Body({
    children,
    style
}: Props) {
    const backgroundColor = useThemeColor({}, 'background');
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const insets = useSafeAreaInsets();

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={{ backgroundColor, flex: 1 }}
            contentContainerStyle={[
                styles.scrollContent,
                {
                    paddingTop: Math.max(insets.top, Platform.OS === 'ios' ? 20 : 16),
                },
            ]}
            scrollEventThrottle={16}>

            <ThemedView style={[styles.content, style]}>{children}</ThemedView>

        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: 'hidden',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        gap: 16,
        overflow: 'hidden',
    },
});
