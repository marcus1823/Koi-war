import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Button,
} from "react-native";

import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
interface Fish {
  _id: string;
  name: string;
  weight: number;
  length: number;
  variety: string;
  images: string[];
  description: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  registrationStatus: string;
  contestId: string;
}
const Contest = [
  {
    id: "1",
    contest: {
      id: "1",
      name: "Giải Đấu Cá Koi Miền Bắc 12 2024",
      description: "Giải đấu cá Koi lớn nhất Miền Bắc năm 2024",
      contestInstances: [],
    },
    name: "Mùa Đông 2024",
    startDate: "2024-04-02T00:00:00.000Z",
    endDate: "2024-05-07T00:00:00.000Z",
    isActive: false,
    description: "Giải đấu mùa Đông, tổ chức tại TP.HCM",
    rules: "Di chuyển vào HCM để tham gia",
    images:
      "https://i.pinimg.com/564x/bf/69/5f/bf695f58110594bac0b2976b9e942691.jpg",
    isDisabled: false,
    contestSubCategories: ["Cá Koi", "Cuộc Thi"],
  },
  {
    id: "2",
    contest: {
      id: "2",
      name: "Giải Cá Koi Quốc Gia 2024",
      description: "Cuộc thi cá Koi lớn nhất toàn quốc",
      contestInstances: [],
    },
    name: "Mùa Hè 2024",
    startDate: "2024-06-01T00:00:00.000Z",
    endDate: "2024-07-15T00:00:00.000Z",
    isActive: false,
    description: "Giải đấu mùa Hè, tổ chức tại Hà Nội",
    rules: "Tham gia với cá Koi đẹp nhất",
    images:
      "https://kodamakoishow.com/wp-content/uploads/2024/10/5th-Kodama-Virtual-Koi-Show.jpg",
    isDisabled: false,
    contestSubCategories: ["Cá Koi", "Cuộc Thi"],
  },
  {
    id: "3",
    contest: {
      id: "3",
      name: "Giải Cá Koi Đẹp Nhất 2024",
      description: "Cuộc thi tìm kiếm cá Koi đẹp nhất",
      contestInstances: [],
    },
    name: "Mùa Xuân 2024",
    startDate: "2024-010-01T00:00:00.000Z",
    endDate: "2024-11-15T00:00:00.000Z",
    isActive: true,
    description: "Giải đấu mùa Xuân, tổ chức tại Đà Nẵng",
    rules: "Chọn cá Koi đẹp nhất để tham gia",
    images:
      "https://hikaripetfood.com/wp-content/uploads/2024/06/hikari-vietnam-koi-show-2024.jpg",
    isDisabled: false,
    contestSubCategories: ["Cá Koi", "Cuộc Thi"],
  },
  {
    id: "4",
    contest: {
      id: "4",
      name: "Giải Cá Koi Quốc Tế 2024",
      description: "Cuộc thi cá Koi quốc tế",
      contestInstances: [],
    },
    name: "Mùa Thu 2024",
    startDate: "2024-11-05T00:00:00.000Z",
    endDate: "2024-12-15T00:00:00.000Z",
    isActive: true,
    description: "Giải đấu mùa Thu, tổ chức tại TP.HCM",
    rules: "Tham gia với cá Koi từ các quốc gia khác",
    images:
      "https://japan-avenue.com/cdn/shop/articles/koi-fish-meaning-min.webp?v=1693134758&width=1000",
    isDisabled: false,
    contestSubCategories: ["Cá Koi", "Cuộc Thi"],
  },
  {
    id: "6721e27443d22c42e4c1d993",
    contest: {
      id: "672100e85eaba638c1ff4e0f",
      name: "Giải Cá Koi Miền Nam 2024 ",
      description: "Cuộc thi cá Koi lớn nhất Miền Nam",
      contestInstances: [],
    },
    name: "Mùa Đông 2024",
    startDate: "2024-11-02T00:00:00.000Z",
    endDate: "2024-12-07T00:00:00.000Z",
    isActive: false,
    description: "Giải đấu mùa Đông, tổ chức tại Cần Thơ",
    rules: "Di chuyển vào Cần Thơ để tham gia",
    images:
      "https://japan-avenue.com/cdn/shop/articles/koi-fish-meaning-min.webp?v=1693134758&width=1000",
    isDisabled: true,
    contestSubCategories: ["Cá Koi", "Cuộc Thi"],
  },
];
const fishRegistration = [
  {
    _id: "6721f38553d22c42e4c1d991",
    name: "Kohaku A1",
    weight: 2.5,
    length: 35,
    variety: "Koi",
    images: [
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
    ],
    description: "Cá Koi Kohaku màu trắng đỏ, 2 tuổi",
    user: "user123",
    createdAt: "2024-10-30T22:50:34.121Z",
    updatedAt: "2024-10-30T22:50:34.121Z",
    registrationStatus: "agree",
    contestId: "1",
  },
  {
    _id: "6721f38553d22c42e4c1d992",
    name: "Sanke B2",
    weight: 3.0,
    length: 40,
    variety: "Koi",
    images: [
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
    ],
    description: "Cá Koi Sanke màu đỏ trắng, 3 tuổi",
    user: "user456",
    createdAt: "2024-10-30T22:50:34.121Z",
    updatedAt: "2024-10-30T22:50:34.121Z",
    registrationStatus: "wait",
    contestId: "2",
  },
  {
    _id: "6721f38553d22c42e4c1d993",
    name: "Showa C3",
    weight: 2.8,
    length: 38,
    variety: "Koi",
    images: [
      "https://i.pinimg.com/564x/82/05/fa/8205fafd9f1c74f29ef7e38c716e1c12.jpg",
    ],
    description: "Cá Koi Showa màu đen đỏ, 2 tuổi",
    user: "user789",
    createdAt: "2024-10-30T22:50:34.121Z",
    updatedAt: "2024-10-30T22:50:34.121Z",
    registrationStatus: "reject",
    contestId: "3",
  },
];

const CompetitionDetailPage = () => {
  const router = useRouter();
  const { contestId } = useLocalSearchParams();
  const contest = Contest.find((item) => item.id === contestId);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  // const registeredFish = fishRegistration.filter(
  //   (fish) => fish.contestId === contestId
  // );
  // Cập nhật trạng thái cá
  const updateFishStatus = (fishId: string, newStatus: string) => {
    fishRegistration.forEach((fish) => {
      if (fish._id === fishId) {
        fish.registrationStatus = newStatus;
      }
    });
  };
  // đỏ do chưa có model
  const handleAgreePress = (fish) => {
    // Cập nhật trạng thái
    updateFishStatus(fish._id, "agree");
    console.log(`Đã đồng ý cá: ${fish.name}`);

    setSelectedStatus("wait");
  };

  const handleRejectPress = (fish: any) => {
    setSelectedFish(fish);
    setModalVisible(true);
  };
  const handleConfirmReject = () => {
    if (selectedFish) {
      updateFishStatus(selectedFish._id, "reject");
      console.log(`Đã từ chối cá: ${selectedFish.name}`);
      setModalVisible(false);
      setSelectedFish(null);
    }
  };

  const handleCancelReject = () => {
    setModalVisible(false);
    setSelectedFish(null);
  };
  const currentDate = new Date();
  let statusColor;

  if (contest.isDisabled) {
    statusColor = "black"; // Bị hủy
  } else if (!contest.isActive && currentDate > new Date(contest.endDate)) {
    statusColor = "#ff0000"; // Kết thúc
  } else if (
    currentDate >= new Date(contest.startDate) &&
    currentDate < new Date(contest.endDate)
  ) {
    statusColor = "#28a745"; // Đang diễn ra
  } else if (currentDate < new Date(contest.startDate)) {
    statusColor = "#f48516"; // Sắp diễn ra
  }

  if (!contest) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Cuộc thi không tồn tại.</Text>
      </View>
    );
  }
  // Lọc danh sách cá theo trạng thái đã chọn
  const filteredFish = fishRegistration.filter((fish) => {
    if (selectedStatus === "all") return true;
    return fish.registrationStatus === selectedStatus;
  });
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/staff/manageCompetition")}>
        <View style={styles.backButton}>
          <AntDesign name="arrowleft" size={38} color="#333" />
          <Text style={styles.backButtonText}>Quay lại</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={{ uri: contest.images }} style={styles.image} />
        <Text style={styles.title}>{contest.contest.name}</Text>

        <Text style={styles.description}>Mô tả: {contest.description}</Text>
        <Text style={styles.rules}>Quy tắc: {contest.rules}</Text>
        <Text style={styles.date}>
          Ngày bắt đầu: {new Date(contest.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.date}>
          Ngày kết thúc: {new Date(contest.endDate).toLocaleDateString()}
        </Text>
        <Text style={[styles.status, { color: statusColor }]}>
          {contest.isDisabled ? (
            <View>
              <FontAwesome
                name="circle"
                size={20}
                style={[styles.status, { color: statusColor }]}
              />
              <Text> Bị hủy</Text>
            </View>
          ) : currentDate > new Date(contest.endDate) ? (
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="circle"
                size={20}
                style={[styles.status, { color: statusColor }]}
              />
              <Text style={[styles.status, { color: statusColor }]}>
                Cuộc thi đã kết thúc
              </Text>
            </View>
          ) : currentDate >= new Date(contest.startDate) &&
            currentDate < new Date(contest.endDate) ? (
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="circle"
                size={20}
                style={[styles.status, { color: statusColor }]}
              />
              <Text style={[styles.status, { color: statusColor }]}>
                Cuộc thi đang diễn ra
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", paddingTop: 15 }}>
              <FontAwesome
                name="circle"
                size={20}
                style={[styles.status, { color: statusColor }]}
              />
              <Text style={[styles.status, { color: statusColor }]}>
                Cuộc thi sắp diễn ra
              </Text>
            </View>
          )}
        </Text>
      </View>

      {currentDate <= new Date(contest.endDate) && (
        <View>
          <Text style={styles.sectionTitle}>Danh sách cá tham gia</Text>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.filterButtons, ,]} // Căn giữa các nút
              // Thêm khoảng cách giữa nút và danh sách
            >
              <TouchableOpacity
                onPress={() => setSelectedStatus("all")}
                style={[
                  styles.filterButton,
                  selectedStatus === "all" && styles.filterButtonActive,
                ]}
              >
                <Text style={styles.filterButtonText}>Tất cả</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedStatus("wait")}
                style={[
                  styles.filterButton,
                  selectedStatus === "wait" && styles.filterButtonActive,
                ]}
              >
                <Text style={styles.filterButtonText}>Đang đợi xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedStatus("agree")}
                style={[
                  styles.filterButton,
                  selectedStatus === "agree" && styles.filterButtonActive,
                ]}
              >
                <Text style={styles.filterButtonText}>Đã đồng ý</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedStatus("reject")}
                style={[
                  styles.filterButton,
                  selectedStatus === "reject" && styles.filterButtonActive,
                ]}
              >
                <Text style={styles.filterButtonText}>Đã từ chối</Text>
              </TouchableOpacity>
            </ScrollView>

            <FlatList
              data={filteredFish}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.fishList}
              renderItem={({ item }) => (
                <View style={styles.fishCard}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.fishImage}
                  />
                  <View style={styles.fishInfo}>
                    <Text style={styles.fishName}>{item.name}</Text>
                    <Text style={styles.fishDetail}>Loài: {item.variety}</Text>
                    <Text style={styles.fishDetail}>
                      Trọng lượng: {item.weight} kg
                    </Text>
                    <Text style={styles.fishDetail}>
                      Chiều dài: {item.length} cm
                    </Text>
                    <Text style={styles.fishStatus}>
                      Tình trạng đăng ký: {item.registrationStatus}
                    </Text>

                    {/* Hiển thị nút dựa trên trạng thái đăng ký */}
                    {item.registrationStatus === "wait" && (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleAgreePress(item)}
                        >
                          <Text style={styles.buttonText}>Đồng ý</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleRejectPress(item)}
                        >
                          <Text style={styles.buttonText}>Từ chối</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    {item.registrationStatus === "agree" && (
                      <Text style={styles.buttonText}>Đồng ý</Text>
                    )}
                    {item.registrationStatus === "reject" && (
                      <Text style={styles.buttonText}>Từ chối </Text>
                    )}
                  </View>
                </View>
              )}
            />
            <Modal
              transparent={true}
              animationType="slide"
              visible={isModalVisible}
              onRequestClose={handleCancelReject}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>
                    Bạn có chắc chắn muốn từ chối cá {selectedFish?.name}?
                  </Text>
                  <View style={styles.modalButtons}>
                    <Button title=" Từ chối" onPress={handleConfirmReject} />
                    <Button title="Hủy" onPress={handleCancelReject} />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f9f9f9",
  },
  backButton: {
    backgroundColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
    fontWeight: "bold",
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffff",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  rules: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  fishList: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  fishCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fishImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  fishInfo: {
    flex: 1,
  },
  fishName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  fishDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  fishStatus: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginRight: 10,
  },
  filterButtons: {
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    paddingBottom: 0,
  },
  filterButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    height: 40,
    marginHorizontal: 10,
  },
  filterButtonActive: {
    backgroundColor: "#666",
  },
  filterButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",

    marginHorizontal: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "#333",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CompetitionDetailPage;
