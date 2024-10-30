import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
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
    images: ["https://example.com/fish1.jpg"],
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
    images: ["https://example.com/fish2.jpg"],
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
    images: ["https://example.com/fish3.jpg"],
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

  if (!contest) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Cuộc thi không tồn tại.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/staff/manageCompetition")}>
        <View style={{ paddingBottom: 10, marginTop: 25 }}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>{contest.contest.name}</Text>
        <Image source={{ uri: contest.images }} style={styles.image} />
        <Text style={styles.description}>{contest.description}</Text>
        <Text style={styles.date}>
          Ngày bắt đầu: {new Date(contest.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.date}>
          Ngày kết thúc: {new Date(contest.endDate).toLocaleDateString()}
        </Text>
        <Text style={styles.rules}>Quy tắc: {contest.rules}</Text>
      </View>
      <FlatList />
      (gọi ra các danh sách)
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  rules: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default CompetitionDetailPage;
