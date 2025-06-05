import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IButton } from "./interfaces";

export default function Button({ children, textStyle, style, ...rest }: IButton) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'red'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});
