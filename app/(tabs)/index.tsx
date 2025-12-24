import { Button, StyleSheet, View } from 'react-native';

import Body from '@/components/body';
import GlassOfWater from '@/components/glass_of_water';
import { Colors } from '@/constants/theme';
import { useWater } from '@/context/WaterContext';
import { useFirstLaunch } from '@/hooks/use-first-launch';

export default function HomeScreen() {
  const { glasses, goal, addGlass, removeGlass, reset } = useWater();
  const { resetTutorial } = useFirstLaunch();

  console.log(glasses, goal);


  return (
    <Body>
      <GlassOfWater/>
      <View style={styles.buttonContainer}>
        <Button title="Añadir vaso" onPress={() => addGlass()} color={Colors.light.tint} />
        <Button title="Quitar vaso" onPress={() => removeGlass()} color={Colors.light.tint} />
        <Button title="Resetear" onPress={() => reset()} color={Colors.light.tint} />
        <Button title="Ver tutorial" onPress={() => resetTutorial()} color={Colors.light.tint} />
      </View>

    </Body>
  );
}

const styles = StyleSheet.create({

  buttonContainer: {
    gap: 8,
  },
});
