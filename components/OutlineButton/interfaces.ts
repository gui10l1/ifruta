import { PropsWithChildren } from "react";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";

export type IOutlineButton = PropsWithChildren<TouchableOpacityProps> & {
  textStyle?: StyleProp<TextStyle>;
}