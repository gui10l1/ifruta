import { Stack } from "expo-router";
import CreatePostProvider from "../contexts/CreatePostContext";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";


export default function AppLayout() {
    return (
        <CreatePostProvider>
            <StatusBar style={Platform.OS === 'ios' ? 'auto' : 'dark'} backgroundColor="#fff" />
            <Stack screenOptions={{ headerShown: false }} />
        </CreatePostProvider>
    )
}