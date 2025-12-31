import 'react-native-reanimated';

import Body from '@/components/body';
import { Input } from '@/components/design-system/Input';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol.ios';
import { useFirstLaunch } from '@/hooks/use-first-launch';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import { Button, Select } from '@/components/design-system';
import { useNotifications } from '@/hooks/use-notification';
import { useUser } from '@/hooks/use-user';
import { useWater } from '@/hooks/use-water';

export default function WelcomeScreen() {
  const { markTutorialAsSeen } = useFirstLaunch();
  const { goal, setGoal } = useWater();
  const [step, setStep] = useState(1);

  const {
    enabled: notificationsEnabled,
    reminderIntervalMinutes,
    intervalOptions,
    handleIntervalChange,
    handleNotificationsChange,
  } = useNotifications();


  const {
    setName,
    setAge,
    setEmail,
    setPhone,
    name,
    age,
    email,
    phone,
  } = useUser();

  const done = () => {
    markTutorialAsSeen();
    router.replace('/(tabs)');
  };


  return (
    <Body style={styles.body}>
      {step === 1 && (
        <>
          <ThemedText type="title">
            ¡Bienvenido!
          </ThemedText>
          <ThemedText type="subtitle">Se que no tomas agua ;), Dejame ayudarte.</ThemedText>
          <ThemedText type="default">
            Primero necesito que me des algunos datos para poder ayudarte mejor.
          </ThemedText>

          <ThemedText type="subtitle">
            ¿Cuál es tu nombre?
          </ThemedText>
          <Input
            value={name}
            keyboardType="default"
            placeholder="Chico percebe..."
            onChangeText={(text) => setName(text)}
          />

          <ThemedText type="subtitle">
            ¿Cuál es tu edad?
          </ThemedText>
          <Input
            value={isNaN(age) ? '0' : age?.toString()}
            keyboardType="numeric"
            placeholder="18"
            onChangeText={(text) => setAge(parseInt(text))}
          />

          <ThemedText type="subtitle">
            ¿Cuál es tu correo electrónico?
          </ThemedText>
          <Input
            value={email}
            keyboardType="email-address"
            placeholder="example@example.com"
            onChangeText={(text) => setEmail(text)}
          />

          <ThemedText type="subtitle">
            ¿Cuál es tu teléfono?
          </ThemedText>
          <Input
            value={phone}
            keyboardType="numeric"
            placeholder="+56 9 1234 5678"
            onChangeText={(text) => setPhone(text)}
          />

          <Button title="Continuar" onPress={() => setStep(step + 1)} />
        </>
      )}

      {step === 2 && (
        <>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setStep(step - 1)}>
              <IconSymbol name="arrow.left.circle.fill" size={24} />
            </TouchableOpacity>
            <ThemedText type="title">
              paso a paso...
            </ThemedText>
          </View>
          <ThemedText type="subtitle">
            ¿Cuántos vasos de agua tomas al día?
          </ThemedText>
          <ThemedText type="default">
            Esta información nos ayudará a calcular la cantidad de agua que necesitas tomar al día y motivandonos a cumplir con tu meta.
          </ThemedText>
          <Input
            value={goal.toString() || ''}
            keyboardType="numeric"
            placeholder="12"
            onChangeText={(text) => {
       
              setGoal(parseInt(text) || 0);
            }}  
          />
          <Button title="Continuar" onPress={() => setStep(step + 1)} />
        </>
      )}

      {step === 3 && (
        <>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setStep(step - 1)}>
              <IconSymbol name="arrow.left.circle.fill" size={24} />
            </TouchableOpacity>
            <ThemedText type="title">¿Te notificamos?</ThemedText>
          </View>
          <ThemedText type="default">
            Aveces es mejor cuando recibimos un poco de ayuda.. una notificcion puede marcar la
            diferencia.
          </ThemedText>
          <View style={styles.switchContainer}>
            <Switch value={notificationsEnabled} onValueChange={handleNotificationsChange} />
            <ThemedText type="subtitle">Recibir notificaciones</ThemedText>
          </View>

          {notificationsEnabled && (
            <Select
              label="¿Cada cuánto quieres que te notifiquemos?"
              options={intervalOptions}
              value={reminderIntervalMinutes}
              onValueChange={(value) => handleIntervalChange(value as number)}
            />
          )}

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
    gap: 10,
  },
  buttonEnd: {
    marginTop: 'auto',
  },
  iconContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  body: {
    gap: 30,
  },
});
