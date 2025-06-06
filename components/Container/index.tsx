import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { IContainer } from "./interfaces";
import Constants from 'expo-constants';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Container({ children, style }: IContainer) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
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
