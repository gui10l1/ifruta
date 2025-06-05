import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IOutlineButton } from "./interfaces";

export default function OutlineButton({ children, style, textStyle, ...rest }: IOutlineButton) {
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
    borderColor: '#D92525',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D92525'
  }
});
