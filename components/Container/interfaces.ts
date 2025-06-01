import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface IContainer extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}