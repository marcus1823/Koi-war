import {
    createSubCategory,
    getAllSubCategories,
    updateSubCategory,
} from "@/api/admin/subCategories";
import { SubCategory } from "@/models/types";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { SubCategoryModal } from "./subModal";

interface RouteParams {
  contestInstanceId: string;
}

const SubCategoriesScreen: React.FC = () => {
  const { params } = useRoute<any>();
//   const contestInstanceId = params?.contestInstanceId;

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const route = useRoute();
  const { contestInstanceId } = route.params as RouteParams;

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllSubCategories(contestInstanceId);
      setSubCategories(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch subcategories");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubCategory = () => {
    setModalMode("create");
    setSelectedSubCategory(null);
    setIsModalVisible(true);
  };

  const handleEdit = (id: string) => {
    const selectedItem = subCategories.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedSubCategory(selectedItem);
      setModalMode("edit");
      setIsModalVisible(true);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Subcategory", `Deleting subcategory with ID: ${id}`);
    // Implement delete logic here
  };

  const handleSubmit = async (subCategoryData: {
    name: string;
    description: string;
  }) => {
    try {
      if (modalMode === "create") {
        await createSubCategory(subCategoryData, contestInstanceId);
      } else if (selectedSubCategory) {
        await updateSubCategory(selectedSubCategory.id, subCategoryData);
      }
      setIsModalVisible(false);
      fetchSubCategories();
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
      return newSelected;
    });
  };

  const SubCategoryItem: React.FC<{ item: SubCategory }> = ({ item }) => (
    <View style={styles.listItem}>
      <Checkbox
        status={selectedIds.has(item.id) ? "checked" : "unchecked"}
        onPress={() => toggleSelect(item.id)}
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => handleEdit(item.id)}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      <Text style={styles.mainTitle}>Hạng mục thi đấu</Text>
      <Text style={styles.subtitle}>Lựa chọn hạng mục thi đấu cho đợt thi</Text>

      <View style={styles.addButtonContainer}>
        <Button
          title="Thêm hạng mục"
          onPress={handleAddSubCategory}
          color="#1E90FF"
        />
      </View>

      <FlatList
        data={subCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SubCategoryItem item={item} />}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />

      <SubCategoryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        initialData={selectedSubCategory}
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
  mainTitle: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  addButtonContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  list: {
    width: "100%",
  },
  listContainer: {
    paddingVertical: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SubCategoriesScreen;
