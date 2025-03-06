import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack, Tabs, useRouter } from "expo-router";
import { Button, View, StyleSheet } from "react-native";
import { i18n, useLanguage } from "@/contexts/LanguageContext";

export default function ProtectedLayout() {
    const { isAllowed, logout } = useAuth();
    const router = useRouter();
    const { changeLanguage } = useLanguage();

    if (!isAllowed) return <Redirect href="/login" />
    return <Tabs screenOptions={{
        headerTitle: "", headerRight: () => (
            <View style={styles.buttonContainer}>
                <Button
                    title={i18n.t("language")}
                    onPress={() => { changeLanguage() }}
                    color="#3498db"
                />
                <Button
                    title={i18n.t("logout")}
                    onPress={() => { logout(); router.replace("/login"); }}
                    color="#ff5733"
                />
            </View>
        )
    }} />

}
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        gap: 10, // Adds spacing between buttons
        alignItems: "center",
        paddingRight: 10, // Adds some right padding
    }
});