import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/supabase";

export default function AppScreen() {
    const [hasSession, setHasSession] = useState(false);

    useEffect(() => {
        async function loadSession() {
            const { data: { session } } = await supabase.auth.getSession();

            setHasSession(session !== null);
        }

        loadSession();
    }, []);

    if (hasSession) {
        return (
            <Redirect href="(private)/home" />
        )
    }

    return (
        <Redirect href="(public)/login" />
    )
}