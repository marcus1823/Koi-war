import { SubCategory } from "@/models/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface SubCategoryCardProps {
  subCategory: SubCategory;
  onEdit: (subCategory: SubCategory) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (subCategory: SubCategory) => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
  subCategory,
  onEdit,
  onDelete,
  isSelected = false,
  onSelect,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {subCategory.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {subCategory.description}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.checkboxButton]}
            onPress={() => onSelect?.(subCategory)}
            activeOpacity={0.7}
          >
            <Icon
              name={isSelected ? "check-box" : "check-box-outline-blank"}
              size={20}
              color={isSelected ? "#4CAF50" : "#757575"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => onEdit(subCategory)}
          >
            <Icon name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => onDelete(subCategory.id)}
          >
            <Icon name="delete" size={20} color="#f44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
  checkboxButton: {
    marginRight: 8,
  },
  editButton: {
    marginRight: 8,
  },
  deleteButton: {},
});

export default SubCategoryCard;
