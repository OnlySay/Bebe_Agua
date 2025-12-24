import { Colors, HydrationLevels } from '@/constants/theme';
import { useWater } from '@/context/WaterContext';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';

const { width } = Dimensions.get('window');

const GLASS_WIDTH = width * 0.45;
const GLASS_HEIGHT = GLASS_WIDTH * 1.4;

export default function GlassOfWater() {
    const { glasses, goal } = useWater();

    const fillPercentage = Math.min(glasses / goal, 1);

    // Animación del nivel de agua
    const waterLevel = useRef(new Animated.Value(0)).current;

    // Animación de burbujas
    const bubble1Anim = useRef(new Animated.Value(0)).current;
    const bubble2Anim = useRef(new Animated.Value(0)).current;
    const bubble3Anim = useRef(new Animated.Value(0)).current;

    // Determinar color y texto según el nivel
    const getHydrationData = () => {
        const percentage = fillPercentage * 100;
        
        if(glasses > goal + 2 && percentage === 100) {
            return {
                color: HydrationLevels.low,
                text: '¡Sobre hidratado! No te excedas, beber mucha agua puede ser perjudicial para tu salud',
                waterColor: HydrationLevels.optimal
            }
        } 
        
        if (percentage === 0) {
            return {
                color: HydrationLevels.critical,
                text: '¡Hora de hidratarte!',
                waterColor: Colors.light.waterLight
            };
        } else if (percentage < 25) {
            return {
                color: HydrationLevels.critical,
                text: '¡Necesitas más agua!',
                waterColor: '#EF476F40'
            };
        } else if (percentage < 50) {
            return {
                color: HydrationLevels.low,
                text: 'Vas bien, ¡sigue así!',
                waterColor: Colors.light.water
            };
        } else if (percentage < 75) {
            return {
                color: HydrationLevels.good,
                text: '¡Muy bien hidratado!',
                waterColor: Colors.light.water
            };
        } else if (percentage < 100) {
            return {
                color: HydrationLevels.optimal,
                text: '¡Excelente!',
                waterColor: HydrationLevels.optimal
            };
        } else {
            return {
                color: HydrationLevels.optimal,
                text: '¡Excelente!',
                waterColor: HydrationLevels.optimal
            };
        }
    };

    const { color, text, waterColor } = getHydrationData();

    // Animar el nivel de agua cuando cambia
    useEffect(() => {
        Animated.spring(waterLevel, {
            toValue: fillPercentage,
            tension: 20,
            friction: 7,
            useNativeDriver: false,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fillPercentage]);



    // Determinar si las burbujas deben mostrarse
    const showBubbles = fillPercentage > 0.1;

    useEffect(() => {
        if (!showBubbles) {
            bubble1Anim.setValue(0);
            bubble2Anim.setValue(0);
            bubble3Anim.setValue(0);
            return;
        }

        const createBubbleAnimation = (anim: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 2500,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        const bubble1Loop = createBubbleAnimation(bubble1Anim, 0);
        const bubble2Loop = createBubbleAnimation(bubble2Anim, 800);
        const bubble3Loop = createBubbleAnimation(bubble3Anim, 1600);

        bubble1Loop.start();
        bubble2Loop.start();
        bubble3Loop.start();

        return () => {
            bubble1Loop.stop();
            bubble2Loop.stop();
            bubble3Loop.stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showBubbles]);

    // Interpolación para la altura del agua
    const animatedWaterHeight = waterLevel.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    // Interpolaciones para las burbujas
    const createBubbleStyle = (anim: Animated.Value, leftOffset: number) => ({
        transform: [
            {
                translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -GLASS_HEIGHT * 0.8],
                }),
            },
            {
                translateX: anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, leftOffset > 50 ? 8 : -8, 0],
                }),
            },
            {
                scale: anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1, 0.3],
                }),
            },
        ],
        opacity: anim.interpolate({
            inputRange: [0, 0.2, 0.8, 1],
            outputRange: [0, 0.8, 0.6, 0],
        }),
    });

    return (
        <View style={styles.container}>
            {/* Contador de vasos */}
            <View style={styles.counterContainer}>
                <ThemedText type="subtitle" style={[styles.counter, { color }]}>
                    {glasses}/{goal}
                </ThemedText>
            </View>

            {/* El vaso */}
            <View style={styles.glassWrapper}>
                {/* Sombra del vaso */}
                <View style={styles.glassShadow} />

                {/* Contenedor del vaso con forma trapezoidal */}
                <View style={styles.glass}>
                    {/* Reflejo del vidrio */}
                    <View style={styles.glassReflection} />
                    <View style={styles.glassReflection2} />

                    {/* El agua */}
                    <Animated.View
                        style={[
                            styles.water,
                            {
                                height: animatedWaterHeight,
                                backgroundColor: waterColor,
                            },
                        ]}
                    >

                        {/* Burbujas */}
                        {showBubbles && (
                            <>
                                <Animated.View
                                    style={[
                                        styles.bubble,
                                        { left: '25%' },
                                        createBubbleStyle(bubble1Anim, 25),
                                    ]}
                                />
                                <Animated.View
                                    style={[
                                        styles.bubble,
                                        { left: '60%' },
                                        createBubbleStyle(bubble2Anim, 60),
                                    ]}
                                />
                                <Animated.View
                                    style={[
                                        styles.bubble,
                                        styles.bubbleSmall,
                                        { left: '40%' },
                                        createBubbleStyle(bubble3Anim, 40),
                                    ]}
                                />
                            </>
                        )}
                    </Animated.View>

                    {/* Borde inferior del vaso */}
                    <View style={styles.glassBottom} />
                </View>
            </View>

            {/* Mensaje de estado */}
            <ThemedText type="thin" style={[styles.statusText, { color }]}>
                {text}
            </ThemedText>

            {/* Barra de progreso */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <Animated.View
                        style={[
                            styles.progressFill,
                            {
                                width: waterLevel.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                                backgroundColor: color,
                            },
                        ]}
                    />
                </View>
                <ThemedText type="thin" style={styles.progressText}>
                    {Math.round(fillPercentage * 100)}%
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
    },
    counterContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    counter: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    glassWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    glassShadow: {
        position: 'absolute',
        bottom: -10,
        width: GLASS_WIDTH * 0.7,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 50,
        transform: [{ scaleX: 1.2 }],
    },
    glass: {
        width: GLASS_WIDTH,
        height: GLASS_HEIGHT,
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderTopWidth: 6,
        borderBottomWidth: 8,
        borderRadius: 8,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
        // Efecto de vidrio
        shadowColor: Colors.light.water,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    glassReflection: {
        position: 'absolute',
        top: 20,
        left: 8,
        width: 4,
        height: '60%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 4,
        transform: [{ rotate: '3deg' }],
        zIndex: 10,
    },
    glassReflection2: {
        position: 'absolute',
        top: 30,
        left: 18,
        width: 2,
        height: '40%',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 2,
        transform: [{ rotate: '3deg' }],
        zIndex: 10,
    },
    glassBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    water: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
    },
    bubble: {
        position: 'absolute',
        bottom: 10,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    bubbleSmall: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        width: GLASS_WIDTH * 1.2,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        minWidth: 40,
        textAlign: 'right',
    },
});
