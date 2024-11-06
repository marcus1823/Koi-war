import { createVariety } from "@/api/admin/varieties";
import { deleteVariety, getAllVariety, updateVariety } from "@/api/varietyApi";
import { CreateVarietyPayload, Variety } from "@/models/types";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import VarietyCard from "./varieCard";
import { VarietyModal } from "./varieModal";

interface RouteParams {
  id: string;
  contestInstanceName: string;
  contestInstanceDes: string;
}

const EmptyListComponent: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>Chưa có hạng mục nào</Text>
  </View>
);

const VarietiesScreen: React.FC = () => {
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedVariety, setSelectedVariety] = useState<Variety | null>(null);
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([]);

  const route = useRoute();
  const { contestInstanceName, contestInstanceDes } =
    route.params as RouteParams;

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      setLoading(true);
      const data = await getAllVariety();
      setVarieties(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch varieties");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVariety = () => {
    setModalMode("create");
    setSelectedVariety(null);
    setModalVisible(true);
  };

  const handleEditVariety = (variety: Variety) => {
    setModalMode("edit");
    setSelectedVariety(variety);
    setModalVisible(true);
  };

  const handleDeleteVariety = (id: string) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa giống này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteVariety(id);
            await fetchVarieties();
          } catch (err) {
            setError("Lỗi khi xoá Giống.");
          }
        },
      },
    ]);
  };

  const handleSelect = (variety: Variety) => {
    setSelectedVarieties((prev) => {
      if (prev.includes(variety._id)) {
        return prev.filter((id) => id !== variety._id);
      }
      return [...prev, variety._id];
    });
  };

  const handleModalSubmit = async (varietyData: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    try {
      setLoading(true);
      const payload: CreateVarietyPayload = {
        name: varietyData.name,
        description: varietyData.description,
        images: [varietyData.imageUrl],
      };

      if (modalMode === "create") {
        await createVariety(payload);
        Alert.alert("Thành công", "Tạo Giống mới thành công!");
      } else if (modalMode === "edit" && selectedVariety) {
        await updateVariety(selectedVariety._id, payload);
        Alert.alert("Thành công", "Cập nhật Giống mới thành công!");
      }

      await fetchVarieties();
      setModalVisible(false);
      setError(null);
    } catch (err) {
      console.error("Error in handleModalSubmit:", err);
      setError(
        modalMode === "create"
          ? "Lỗi khi tạo Giống mới!."
          : "Lỗi khi chỉnh sửa Giống!."
      );
      Alert.alert(
        "Lỗi",
        modalMode === "create"
          ? "There was an issue creating the variety. Please try again."
          : "There was an issue updating the variety. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{contestInstanceName}</Text>
        <Text style={styles.des}>{contestInstanceDes}</Text>
        <Text style={styles.varie}>Giống</Text>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateVariety}
      >
        <Icon name="add" size={24} color="white" />
        <Text style={styles.createButtonText}>Tạo giống mới</Text>
      </TouchableOpacity>

      <FlatList
        data={varieties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VarietyCard
            variety={item}
            onEdit={handleEditVariety}
            onDelete={handleDeleteVariety}
            isSelected={selectedVarieties.includes(item._id)}
            onSelect={handleSelect}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={EmptyListComponent}
      />

      <VarietyModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        initialData={
          selectedVariety
            ? {
                name: selectedVariety.name,
                description: selectedVariety.description,
                imageUrl: selectedVariety.images[0],
              }
            : undefined
        }
        mode={modalMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0e6",
    padding: 16,
  },
  header: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  des: {},
  varie: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
    paddingBottom: 5,
  },
  row: {
    justifyContent: "space-between",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  createButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default VarietiesScreen;
