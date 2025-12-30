import { StyleSheet, View } from 'react-native';

import Body from '@/components/body';
import { Button } from '@/components/design-system';
import GlassOfWater from '@/components/glass_of_water';
import { useFirstLaunch } from '@/hooks/use-first-launch';
import { useNotifications } from '@/hooks/use-notification';
import { useWater } from '@/hooks/use-water';

export default function HomeScreen() {
  const { resetTutorial } = useFirstLaunch();
  const {addGlass,removeGlass,reset } = useWater();

  const { sendTestNotification,setNotification } = useNotifications();
  return (
    <Body>
      <GlassOfWater />
      <View style={styles.buttonContainer}>
        <Button
          title="Añadir vaso"
          onPress={() => {
            addGlass();
            setNotification();
          }}
          variant="primary"
          fullWidth
        />
        <Button
          title="Quitar vaso"
          onPress={() => {
            removeGlass();
            setNotification();
          }}
          variant="secondary"
          fullWidth
        />
        <Button
          title="Resetear"
          onPress={() => {
            reset();
            setNotification();
          }}
          variant="outline"
          fullWidth
        />
        <Button
          title="Ver tutorial"
          onPress={() => resetTutorial()}
          variant="ghost"
          fullWidth
        />
                <Button
          title="🔔 Probar notificación"
          onPress={sendTestNotification}
          variant="primary"
          fullWidth
        />
      </View>
    </Body>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 8,
  },
});
