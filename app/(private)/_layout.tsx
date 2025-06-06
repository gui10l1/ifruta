import { Stack, Tabs } from "expo-router";
import { FavoritesProvider } from "../../contexts/FavoriteContext";

export default function PrivateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <FavoritesProvider>
        <Stack.Screen name="(tabs)" />
      </FavoritesProvider>

    </Stack>
  );
}