import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { IContainer } from "./interfaces";
import Constants from 'expo-constants';

export default function Container({ children, style }: IContainer) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.content, style]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
  }
});
