import { StyleSheet, } from 'react-native';
import Animated, {
    useAnimatedRef
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { PropsWithChildren } from 'react';


const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    children: React.ReactNode;
}>;

export default function Body({
    children
}: Props) {
    const backgroundColor = useThemeColor({}, 'background');
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={{ backgroundColor, flex: 1 }}
            scrollEventThrottle={16}>

            <ThemedView style={styles.content}>{children}</ThemedView>

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
    content: {
        flex: 1,
        padding: 20,
        gap: 16,
        overflow: 'hidden',
    },
});
