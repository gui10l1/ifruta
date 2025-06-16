import { Stack } from "expo-router";
import { FavoritesProvider } from "../contexts/FavoriteContext";
import CreatePostProvider from "../contexts/CreatePostContext";


export default function AppLayout() {
    return (
        <FavoritesProvider>
            <CreatePostProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </CreatePostProvider>
        </FavoritesProvider>
    )
}