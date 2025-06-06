import { PropsWithChildren } from "react";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";

export type IButton = PropsWithChildren<TouchableOpacityProps> & {
  textStyle?: StyleProp<TextStyle>;
};