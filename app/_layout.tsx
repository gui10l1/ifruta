import { Stack } from "expo-router";
import { FavoritesProvider } from "../contexts/FavoriteContext";


export default function AppLayout() {
    return (
        <FavoritesProvider>

            <Stack screenOptions={{ headerShown: false }} />
        </FavoritesProvider>
    )
}