import { getContests, getContestsById } from "@/api/admin/contestApi";
import { getSubCategoriesById } from "@/api/admin/subCategories";
import { getAllRegistrations } from "@/api/registrationAPI";
import { Contest, ContestCardProps, FishScore } from "@/models/types";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FishCard from "./scorefishCard";

interface TabProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

interface ContestInstance {
  id: number;
  name: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
  },
  content: {
    flex: 1,
  },
  contestCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  contestTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fishGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  fishCardContainer: {
    width: "50%",
    padding: 5,
  },
  modalButtonDisabled: {
    backgroundColor: "#999",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 100,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: "#666",
  },
  modalButtonPrimary: {
    backgroundColor: "#007AFF",
  },
  // modalButtonDisabled: {
  //   opacity: 0.5,
  // },
  modalButtonText: {
    color: "#fff",
  },
});

const Tab: React.FC<TabProps> = ({ title, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, active && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const ContestCard: React.FC<ContestCardProps> = ({ contest, onPress }) => (
  <TouchableOpacity style={styles.contestCard} onPress={() => onPress(contest)}>
    <Text style={styles.contestTitle}>{contest.name}</Text>
  </TouchableOpacity>
);

const ScoreScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"scored" | "unscored">("unscored");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [contests, setContests] = useState<Contest[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [scoredFish, setScoredFish] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [contestInstances, setContestInstances] = useState<ContestInstance[]>(
    []
  );
  const [selectedInstance, setSelectedInstance] = useState<number | undefined>(
    undefined
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    number | undefined
  >(undefined);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    try {
      setLoading(true);
      const response = await getContests();
      setContests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load contests:", error);
      Alert.alert("Error", "Failed to load contests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadContestInstances = async (contestId: string) => {
    try {
      setLoading(true);
      const response = await getContestsById(contestId);
      setContestInstances(response.data.contestInstances || []);
    } catch (error) {
      console.error("Failed to load contest instances:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubCategories = async (instanceId: string) => {
    try {
      setLoading(true);
      const response = await getSubCategoriesById(instanceId);
      setSubCategories(response);
    } catch (error) {
      console.error("Failed to load subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInstanceSelect = (instanceId: number) => {
    setSelectedInstance(instanceId);
    loadSubCategories(instanceId.toString());
  };

  const handleSubCategorySelect = (instanceId: number) => {
    setSelectedSubCategory(instanceId);
    loadSubCategories(instanceId.toString());
  };

  const handleContestPress = (contest: Contest) => {
    setSelectedContest(contest);
    setModalVisible(true);
    loadContestInstances(contest.id);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedContest(null);
  };

  const handleModalSubmit = async () => {
    try {
      setLoading(true);
      const response = await getAllRegistrations();
      console.log("getAllRegistrations", response);
      setRegistrations(response.data || []);
      setShowRegistrationModal(true); // Mở modal đăng ký
      setModalVisible(false); // Đóng modal chọn đợt thi và phân loại
    } catch (error) {
      console.error("Failed to load registrations:", error);
      Alert.alert("Error", "Failed to load registrations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScoreSubmit = (scoreData: FishScore) => {
    setScoredFish((prev) => [...prev, scoreData.fishId]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.tabContainer}>
            <Tab
              title="Chưa Chấm"
              active={activeTab === "unscored"}
              onPress={() => setActiveTab("unscored")}
            />
            <Tab
              title="Đã Chấm"
              active={activeTab === "scored"}
              onPress={() => setActiveTab("scored")}
            />
          </View>

          <ScrollView style={styles.content}>
            {activeTab === "unscored" ? (
              registrations.length > 0 ? (
                <View style={styles.fishGrid}>
                  {registrations
                    .filter((fish) => !scoredFish.includes(fish.id))
                    .map((fish) => (
                      <View key={fish.id} style={styles.fishCardContainer}>
                        <FishCard
                          fish={fish}
                          onScoreSubmit={handleScoreSubmit}
                          scored={false}
                        />
                      </View>
                    ))}
                </View>
              ) : (
                <FlatList
                  data={contests}
                  renderItem={({ item }) => (
                    <ContestCard contest={item} onPress={handleContestPress} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              )
            ) : (
              <View style={styles.fishGrid}>
                {registrations
                  .filter((fish) => scoredFish.includes(fish.id))
                  .map((fish) => (
                    <View key={fish.id} style={styles.fishCardContainer}>
                      <FishCard fish={fish} scored={true} />
                    </View>
                  ))}
              </View>
            )}
          </ScrollView>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chọn đợt thi</Text>
                <Picker
                  selectedValue={selectedInstance}
                  style={styles.picker}
                  onValueChange={(value: number) => handleInstanceSelect(value)}
                >
                  <Picker.Item label="Chọn đợt thi" value={null} />
                  {contestInstances.map((instance) => (
                    <Picker.Item
                      key={instance.id}
                      label={instance.name}
                      value={instance.id}
                    />
                  ))}
                </Picker>
                <Text style={styles.modalTitle}>Chọn phân loại</Text>
                <Picker
                  selectedValue={selectedSubCategory}
                  style={styles.picker}
                  onValueChange={(value: number) =>
                    handleSubCategorySelect(value)
                  }
                >
                  <Picker.Item label="Chọn phân loại" value={null} />
                  {subCategories.map((subCategory) => (
                    <Picker.Item
                      key={subCategory.id}
                      label={subCategory.name}
                      value={subCategory.id}
                    />
                  ))}
                </Picker>

                <Button title="Xác nhận" onPress={handleModalSubmit} />
                <Button title="Hủy" onPress={handleModalClose} />
              </View>
            </View>
          </Modal>

          <Modal
            visible={showRegistrationModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Danh sách đăng ký</Text>
                <FlatList
                  data={registrations}
                  renderItem={({ item }) => (
                    <View style={styles.contestCard}>
                      <Text>{item.name}</Text>
                      {/* Có thể tùy chỉnh thêm các thông tin khác tùy theo dữ liệu của registrations */}
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
                <Button
                  title="Đóng"
                  onPress={() => setShowRegistrationModal(false)}
                />
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default ScoreScreen;
