import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IRadio } from "./interfaces";

export default function Radio({ onChange, value }: IRadio) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onChange(!value)}>
      <View style={[styles.dot, value ? styles.dotActive : {}]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#000'
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#000'
  },
  dotActive: {
    backgroundColor: '#000',
    borderRadius: 100,
  },
});