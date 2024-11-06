import { ContestInstance } from "@/models/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ContestInstanceCardProps {
  instance: ContestInstance;
  onUpdate: () => void;
  onDelete: () => void;
}

export const ContestInstanceCard = ({
  instance,
  onUpdate,
  onDelete,
}: ContestInstanceCardProps) => {
  const router = useRouter();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };
  const handlePress = () => {
    router.push({
      pathname: "/varieties",
      params: { id: instance.id, contestInstanceName: instance.name, contestInstanceDes: instance.description },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image 
        source={{ uri: instance.images }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{instance.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {instance.description}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Bắt đầu: </Text>
          <Text style={styles.date}>{formatDate(instance.startDate)}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Kết thúc: </Text>
          <Text style={styles.date}>{formatDate(instance.endDate)}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onUpdate}>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});