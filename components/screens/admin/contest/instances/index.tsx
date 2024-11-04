import { getContests, getContestsById } from "@/api/admin/contestApi";
import {
  createContestInstance,
  deleteContestInstance,
} from "@/api/admin/contestInstancesApi";
import { Contest } from "@/models/types";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ContestInstanceCard } from "./instancesCard";
import { ContestInstanceModal } from "./instancesModal";

export interface ContestInstance {
  id: string;
  contest: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description: string;
  rules: string;
  images: string[];
  isDisabled: boolean;
  contestSubCategories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ContestInstanceFormData {
  name: string;
  description: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  rules: string;
}

interface RouteParams {
  id: string;
  contestName: string;
  contestDes: string;
}

const ContestInstancesScreen = () => {
  const [instances, setInstances] = useState<ContestInstance[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstance, setSelectedInstance] =
    useState<ContestInstance | null>(null);
  const [currentContest, setCurrentContest] = useState<Contest | null>(null);
  const [contests, setContests] = useState<Contest[]>([]);
  const route = useRoute();
  const { id, contestName, contestDes } = route.params as RouteParams;

  useEffect(() => {
    loadContestAndInstances();
  }, [id]);

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    try {
      const data = await getContests();
      setContests(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Failed to load contests:", error);
    }
  };

  const loadContestAndInstances = async () => {
    try {
      const response = await getContestsById(id);
      if (response && response.data) {
        setCurrentContest(response.data.contest);
        setInstances(response.data.contestInstances || []);
      }
    } catch (error) {
      console.error("Failed to load contest and instances:", error);
      Alert.alert(
        "Lỗi",
        "Không thể tải nội dung đợt thi của cuộc thi. Vui lòng thử lại."
      );
    }
  };

  const handleCreateOrUpdate = async (formData: ContestInstanceFormData) => {
    try {
      if (selectedInstance) {
        // Logic cập nhật nếu cần thêm phần cập nhật
      } else {
        const newContestInstance = await createContestInstance(id, {
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          rules: formData.rules,
          images: formData.imageUrl ? [formData.imageUrl] : [],
          isActive: true,
          isDisabled: false,
          contestSubCategories: [],
          // contest đâu í
        });
        setInstances((prev) => [...prev, newContestInstance]);
        Alert.alert("Thành công", "Đã tạo đợt thi mới thành công!");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi tạo hoặc cập nhật đợt thi:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo đợt thi.");
    }
  };
  
  const handleDelete = async (instances: ContestInstance) => {
    Alert.alert(
      "Xóa Đợt thi",
      `Bạn có chắc muốn xóa đợt thi "${instances.name}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteContestInstance(instances.id);
              setInstances((prev) => prev.filter((i) => i.id !== instances.id));
              Alert.alert("Thành công", "Đã xóa đợt thi thành công");
            } catch (error) {
              console.error("Error deleting contest instance:", error);
              Alert.alert(
                "Lỗi",
                "Không thể xóa đợt thi. Vui lòng thử lại sau."
              );
            }
          },
        },
      ]
    );
  };

  const openCreateModal = () => {
    setSelectedInstance(null);
    setShowModal(true);
  };

  const openUpdateModal = (instance: ContestInstance) => {
    setSelectedInstance(instance);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{contestName} - Đợt Thi</Text>
        <Text style={styles.des}>{contestDes}</Text>
        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Đợt Thi Mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={instances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContestInstanceCard
            instance={item}
            onUpdate={() => openUpdateModal(item)}
            onDelete={handleDelete}
          />
        )}
        extraData={instances}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có đợt thi nào</Text>
          </View>
        )}
      />

      <ContestInstanceModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={
          selectedInstance
            ? {
                name: selectedInstance.name,
                description: selectedInstance.description,
                imageUrl: selectedInstance.images[0] || "",
                startDate: selectedInstance.startDate,
                endDate: selectedInstance.endDate,
                rules: selectedInstance.rules,
              }
            : undefined
        }
        isUpdate={!!selectedInstance}
      />
    </SafeAreaView>
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 8,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
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
});

export default ContestInstancesScreen;
