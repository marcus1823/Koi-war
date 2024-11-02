import { Contest } from "@/models/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ContestCard {
  contest: Contest;
  onUpdate: (contest: Contest) => void;
  onDelete: (contest: Contest) => void;
}

export const ContestCard: React.FC<ContestCard> = ({
  contest,
  onUpdate,
  onDelete,
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{contest.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onUpdate(contest)}>
          <Ionicons name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(contest)}>
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.description}>{contest.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
