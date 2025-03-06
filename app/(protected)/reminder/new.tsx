import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useAuth, Reminder as Reminder } from "@/contexts/AuthContext";
import { i18n } from "@/contexts/LanguageContext";


export default function NewScreen() {
    const { addReminder: addReminder, user } = useAuth();
    const router = useRouter();
    const [formularioReminder, setFormularioReminder] = useState({ titulo: '', descripcion: '' });
    const [scale] = useState(new Animated.Value(1));

    const setTitulo = (value: string) => {
        setFormularioReminder({ ...formularioReminder, titulo: value });
    };

    const setDescripcion = (value: string) => {
        setFormularioReminder({ ...formularioReminder, descripcion: value });
    };

    const clearFormulario = () => {
        setFormularioReminder({ titulo: '', descripcion: '' });
    }

    const handlePressIn = () => {
        Animated.timing(scale, { toValue: 0.95, duration: 1000, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scale, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
    };

    const guardarFormulario = () => {
        let newFormulario: Reminder = { ...formularioReminder, id: ((user?.reminders.length ?? 0) + 1).toString() }
        addReminder(newFormulario);
        clearFormulario();
    }

    return (
        <View style={styles.container}>
            <Text >{i18n.t("tittle")}</Text>

            <TextInput
                style={styles.input}
                value={formularioReminder.titulo}
                onChangeText={setTitulo}
                keyboardType="default"
            />
            <Text >{i18n.t("description")}</Text>

            <TextInput
                multiline
                style={styles.input}
                value={formularioReminder.descripcion}
                onChangeText={setDescripcion}
                keyboardType="default"
            />
            <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { guardarFormulario(); router.push("/reminder"); }}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Ionicons name="save" size={28} color="white" />
                    <Text style={styles.buttonText}>{i18n.t("save")}</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.animatedView, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    style={styles.borrarButton}
                    onPress={() => { clearFormulario }}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Ionicons name="trash-bin" size={28} color="white" />
                    <Text style={styles.buttonText}>{i18n.t("erase")}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F7FA",
    },
    backButton: {
        flexDirection: "row",
        backgroundColor: "#4A90E2",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "white",
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#4A90E2",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    borrarButton: {
        flexDirection: "row",
        backgroundColor: "#D9534F",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    animatedView: {
        width: "85%",
        marginBottom: 15,
    },
});
