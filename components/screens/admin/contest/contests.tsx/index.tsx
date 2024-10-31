import { createContest, getContests } from "@/api/admin/contestApi"; // Import hàm getContests
import { Contest } from "@/models/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ContestsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [contests, setContests] = useState<Contest[]>([]);
  const [newContest, setNewContest] = useState<Contest>({
    id: "",
    name: "",
    description: "",
    contestInstances: [], // Reset instances on successful creation
  });

  // Hàm lấy danh sách các cuộc thi
  const fetchContests = async () => {
    try {
      const fetchedContests = await getContests();
      setContests(fetchedContests);
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

  // Gọi fetchContests khi màn hình được tải lần đầu tiên
  useEffect(() => {
    fetchContests();
  }, []);

  // Hàm tạo cuộc thi
  const handleCreateContest = async () => {
    try {
      const createdContest = await createContest(newContest);
      setContests([createdContest, ...contests]);
      setShowModal(false);
      setNewContest({
        id: "",
        name: "",
        description: "",
        contestInstances: [], // Reset instances on successful creation
      });
      console.log("handleCreateContest", createdContest);
    } catch (error) {
      console.error("Error creating contest:", error);
    }
  };

  const handleUpdateContest = (contest: Contest) => {
    const updatedContests = contests.map((c) =>
      c.id === contest.id ? contest : c
    );
    setContests(updatedContests);
  };

  const handleDeleteContest = (contest: Contest) => {
    const updatedContests = contests.filter((c) => c.id !== contest.id);
    setContests(updatedContests);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Koi Cuộc Thi</Text>
        <Text style={styles.headerSubtitle}>
          {contests.length} active contests
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Cuộc thi Mới</Text>
      </TouchableOpacity>
    </View>
  );

  const getStatusColor = (endDate: string): string => {
    const today = new Date();
    const end = new Date(endDate);
    if (end < today) return "#FF3B30"; // Đã kết thúc - màu đỏ
    if (end.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000)
      return "#FF9500"; // Sắp kết thúc (còn 7 ngày) - màu vàng
    return "#34C759"; // Còn thời gian - màu xanh
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <FlatList
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        data={contests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contestCard}>
            {/* <View
              style={[
                styles.statusBar,
                { backgroundColor: getStatusColor(item.endDate) },
              ]}
            /> */}
            <View style={styles.contestContent}>
              <View style={styles.contestHeader}>
                <Text style={styles.contestName}>{item.name}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => handleUpdateContest(item)}
                    style={[styles.actionButton, styles.editButton]}
                  >
                    <Ionicons name="create-outline" size={20} color="#007AFF" />
                    <Text style={styles.actionButtonText}>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteContest(item)}
                    style={[styles.actionButton, styles.deleteButton]}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                    <Text
                      style={[styles.actionButtonText, styles.deleteButtonText]}
                    >
                      Xoá
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.contestDescription}>{item.description}</Text>
              <View style={styles.contestDates}>
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.contestDateLabel}>Bắt đầu:</Text>
                  {/* <Text style={styles.contestDate}>{item.startDate}</Text> */}
                </View>
                <View style={styles.dateContainer}>
                  <Ionicons name="flag-outline" size={16} color="#666" />
                  <Text style={styles.contestDateLabel}>Kết thúc:</Text>
                  {/* <Text style={styles.contestDate}>{item.endDate}</Text> */}
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tạo mới Cuộc thi</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Cuộc thi</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nhập tên cuộc thi.."
                value={newContest.name}
                onChangeText={(text) =>
                  setNewContest({ ...newContest, name: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mô tả</Text>
              <TextInput
                style={[styles.modalInput, styles.textArea]}
                placeholder="Nhập mô tả.."
                multiline
                numberOfLines={4}
                value={newContest.description}
                onChangeText={(text) =>
                  setNewContest({ ...newContest, description: text })
                }
              />
            </View>

            {/* <View style={styles.dateInputsRow}>
              <View style={styles.dateInputContainer}>
                <Text style={styles.inputLabel}>Start Date</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="YYYY-MM-DD"
                  value={newContest.startDate}
                  onChangeText={(text) =>
                    setNewContest({ ...newContest, startDate: text })
                  }
                />
              </View>

              <View style={styles.dateInputContainer}>
                <Text style={styles.inputLabel}>End Date</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="YYYY-MM-DD"
                  value={newContest.endDate}
                  onChangeText={(text) =>
                    setNewContest({ ...newContest, endDate: text })
                  }
                />
              </View>
            </View> */}

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCreateContest}
              >
                <Text style={styles.createButtonText}>Tạo mới</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 15,
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  contestCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusBar: {
    height: 4,
    width: "100%",
  },
  contestContent: {
    padding: 16,
  },
  contestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  contestName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  editButton: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },
  deleteButton: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButtonText: {
    color: "#FF3B30",
  },
  contestDescription: {
    fontSize: 15,
    color: "#444",
    marginBottom: 16,
    lineHeight: 22,
  },
  contestDates: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contestDateLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    marginRight: 4,
  },
  contestDate: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  modalCloseButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateInputsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  dateInputContainer: {
    flex: 1,
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f4f4f4",
  },
  createButton: {
    backgroundColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ContestsScreen;