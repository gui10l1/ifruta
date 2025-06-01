import { ImageSourcePropType } from "react-native";

export interface IProduct {
  name?: string;
  price: number;
  image: ImageSourcePropType;
  onPress?: () => void;
}