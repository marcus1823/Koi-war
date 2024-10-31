import {
  createContest,
  deleteContest,
  getContests,
  updateContest,
} from "@/api/admin/contestApi";
import { Contest } from "@/models/types";
import { Ionicons } from "@expo/vector-icons";
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
import { ContestCard } from "./contestCard";
import { CreateContestModal } from "./contestModal";

const ContestsScreen = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);

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

  const handleCreateOrUpdate = async (contestData: {
    name: string;
    description: string;
  }) => {
    try {
      if (selectedContest) {
        // Update existing contest
        const updatedContest = await updateContest(
          selectedContest.id,
          contestData
        );
        // Update the contests state with the new updated contest data
        setContests((prev) =>
          prev.map((c) =>
            c.id === selectedContest.id ? { ...c, ...updatedContest } : c
          )
        );
      } else {
        // Create new contest
        const response = await createContest({
          ...contestData,
          id: String(Date.now()),
          contestInstances: [],
        });
        const createdContest = response.data || response;
        setContests((prev) => [createdContest, ...prev]);
      }
    } catch (error) {
      console.error(
        selectedContest
          ? "Failed to update contest:"
          : "Failed to create contest:",
        error
      );
    } finally {
      setSelectedContest(null);
      setShowModal(false);
    }
  };

  const handleDelete = async (contest: Contest) => {
    Alert.alert(
      "Xóa Cuộc thi",
      `Bạn có chắc muốn xóa cuộc thi "${contest.name}" không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteContest(contest.id);
              setContests((prev) => prev.filter((c) => c.id !== contest.id));
            } catch (error) {
              console.error("Error deleting contest:", error);
            }
          },
        },
      ]
    );
  };

  const openCreateModal = () => {
    setSelectedContest(null);
    setShowModal(true);
  };

  const openUpdateModal = (contest: Contest) => {
    setSelectedContest(contest);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Koi Cuộc Thi</Text>
        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cuộc thi Mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContestCard
            contest={item}
            onUpdate={() => openUpdateModal(item)}
            onDelete={handleDelete}
          />
        )}
      />

      <CreateContestModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={
          selectedContest
            ? {
                name: selectedContest.name,
                description: selectedContest.description,
              }
            : undefined
        }
        isUpdate={!!selectedContest}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
  },
});

export default ContestsScreen;
