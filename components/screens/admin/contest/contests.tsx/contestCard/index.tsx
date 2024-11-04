import { Contest } from "@/models/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
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
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/contestInstances",
      params: { id: contest.id, contestName: contest.name, contestDes: contest.description },
    });
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{contest.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              onUpdate(contest);
            }}
          >
            <Ionicons name="create-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              onDelete(contest);
            }}
          >
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>{contest.description}</Text>
      <Text style={styles.instanceCount}>
        Số đợt thi: {contest.contestInstances?.length || 0}
      </Text>
    </TouchableOpacity>
  );
};

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
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  instanceCount: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
});
