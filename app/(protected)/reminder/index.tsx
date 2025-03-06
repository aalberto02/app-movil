import { FlatList, TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ReminderCard from "@/components/ReminderCard";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="list" size={32} color="#2D2E32" />
        <Text style={styles.title}>Tareas</Text>
      </View>

      {(user != null && <FlatList
        data={user?.reminders}
        keyExtractor={(item) => item?.id ?? ''}
        renderItem={({ item }) => (
          <ReminderCard descripcion={item?.descripcion ?? ''} titulo={item?.titulo ?? ''} />
        )}
      />)}
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
    marginLeft: 10,
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