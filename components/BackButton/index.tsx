import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { IBackButton } from "./interfaces";

export default function BackButton({ color }: IBackButton) {
  const router = useRouter();

  const handlePushBack = () => {
    router.back();
  }

  return (
    <TouchableOpacity onPress={handlePushBack}>
      <Feather name="chevron-left" size={32} color={color || "#fff"} />
    </TouchableOpacity>
  );
}