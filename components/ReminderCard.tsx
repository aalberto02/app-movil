import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

type TaskProps = {
    titulo: string;
    descripcion: string;
};

export default function ReminderCard({ titulo, descripcion }: TaskProps) {
    return (
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Ionicons name="alarm-outline" size={24} color="#4A90E2" />
            <Text style={styles.itemTitle}>{titulo}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.itemCategory}>{descripcion}</Text>
          </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#F5F7FA",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#2D2E32",
    },
    item: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    itemHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginLeft: 8,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    itemCategory: {
      fontSize: 14,
      color: "#666",
      marginLeft: 8,
    },
    itemQuantity: {
      fontSize: 14,
      color: "#444",
      fontWeight: "bold",
      marginLeft: 8,
    },
  });