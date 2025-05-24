import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AppScreen() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.navigate('/(public)/login');
        }, 100);
    }, []);

    return null;
}