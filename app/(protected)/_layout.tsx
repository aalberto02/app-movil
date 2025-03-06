import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack, Tabs, useRouter } from "expo-router";
import { Button } from "react-native";

export default function ProtectedLayout() {
    const { isAllowed, logout } = useAuth();
    const router = useRouter();

    if (!isAllowed) return <Redirect href="/login" />
    return <Tabs screenOptions={{ headerTitle: "", headerRight: () => (<Button title="Cerrar Sesión" onPress={() => { logout(); router.replace("/login"); }}></Button>) }} />

}