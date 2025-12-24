
import 'react-native-reanimated';

import Body from '@/components/body';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol.ios';
import { useWater } from '@/context/WaterContext';
import { useFirstLaunch } from '@/hooks/use-first-launch';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Switch, TextInput, View } from 'react-native';



export default function WelcomeScreen() {
    const { markTutorialAsSeen } = useFirstLaunch();
    const { setGoal } = useWater();

    const [step, setStep] = useState(1);

    const [notifications, setNotifications] = useState(false);

    const done = () => {
        markTutorialAsSeen();
        router.navigate('/(tabs)');
    }


    return (
        <Body>
            {step === 1 && (
                <>
                    <ThemedText type="title"> <IconSymbol name="arrow.left.circle.fill" size={24}  /> ¡Bienvenido!</ThemedText>
                    <ThemedText type="subtitle">Se que no tomas agua ;), Dejame ayudarte.</ThemedText>
                    <ThemedText type="default">Primero necesito que me des algunos datos para poder ayudarte mejor.</ThemedText>
                    <Button title="Continuar" onPress={() => setStep(step + 1)}  />
                </>
            )}
            {step === 2 && (
                <>
                    <ThemedText type="subtitle">¿Cuántos vasos de agua tomas al día?</ThemedText>
                    <TextInput placeholder="12" keyboardType="numeric" onChangeText={(text) => setGoal(parseInt(text))} />
                    <Button title="Continuar" onPress={() => setStep(step + 1)} />
                </>
            )}
            {step === 3 && (
                <>
                    
                    <ThemedText type="title">¿ Quieres que te avisemos ?</ThemedText>
                    <ThemedText type="default">Aveces es mejor cuando recibimos un poco de ayuda.. una notificcion puede marcar la diferencia.</ThemedText>
                    <View style={styles.switchContainer}>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                        />
                        <ThemedText type="subtitle">Recibir notificaciones</ThemedText>
                    </View>


                    <Button title="Continuar" onPress={() => setStep(step + 1)} />
                </>
            )}

            {step === 4 && (
                <>
                    <ThemedText type="title">¡Listo! </ThemedText>
                    <ThemedText type="default">Prueba empezando tomando tu primer vaso de agua.</ThemedText>
            
                    <Button title="Finalizar" onPress={() => done()} />
                </>
            )}

        </Body>
    );
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    buttonEnd: {
        marginTop: 'auto',
    },
});