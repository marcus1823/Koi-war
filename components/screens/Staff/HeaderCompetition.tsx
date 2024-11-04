import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Colors } from "../../../constants/Colors";
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

const HeaderCompetition = () => {
  const router = useRouter();
  const currentDate = new Date();
  const handlecontest = (contestId: string) => {
    router.push(`/ManageContest/${contestId}`);
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#eb7452", "#5C98BB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color={Colors.PRIMARY} />
          <TextInput
            placeholder="Tìm kiếm cuộc thi..."
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      <View style={styles.contestCardNote}>
        <Text style={{ fontWeight: "700", marginBottom: 10, fontSize: 16 }}>
          Trạng thái cuộc thi:
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <FontAwesome name="circle" size={20} color="black" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>Bị hủy</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="circle" size={20} color="#28a745" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>
              Đang diễn ra
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <FontAwesome name="circle" size={20} color="#ff0000" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>Kết thúc</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="circle" size={20} color="#f48516" />
            <Text style={{ marginLeft: 5, fontWeight: "500" }}>
              Sắp diễn ra
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={Contest}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          let statusColor;

          // Xác định màu sắc dựa trên trạng thái
          if (item.isDisabled) {
            statusColor = "black"; // Bị hủy
          } else if (!item.isActive && currentDate > new Date(item.endDate)) {
            statusColor = "#ff0000"; // Kết thúc
          } else if (
            currentDate >= new Date(item.startDate) &&
            currentDate < new Date(item.endDate)
          ) {
            statusColor = "#28a745"; // Đang diễn ra
          } else if (currentDate < new Date(item.startDate)) {
            statusColor = "#f48516"; // Sắp diễn ra
          }

          return (
            <TouchableOpacity
              onPress={() => {
                handlecontest(item.contest.id);
              }}
              disabled={item.isDisabled}
            >
              <View style={styles.contestCard}>
                <View
                  style={[
                    styles.statuscontest,
                    { backgroundColor: statusColor },
                  ]}
                />
                <View style={styles.contentContest}>
                  <Image
                    source={{ uri: item.images }}
                    style={styles.contestImage}
                  />
                  <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.contestTitle}>{item.contest.name}</Text>
                    <Text style={styles.contestDate}>
                      Ngày bắt đầu:{" "}
                      {new Date(item.startDate).toLocaleDateString()}{" "}
                    </Text>
                    <Text style={styles.contestDate}>
                      Ngày kết thúc:{" "}
                      {new Date(item.endDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                {item.isDisabled && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "black",
                      opacity: 0.3,
                      borderRadius: 10,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HeaderCompetition;

const styles = StyleSheet.create({
  headerGradient: {
    paddingBottom: 15,
    paddingTop: 55,
    backgroundColor: Colors.PRIMARY,
    elevation: 5,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 45,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 100,
    elevation: 5,
  },
  searchInput: {
    fontFamily: "outfit",
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 5,
    // backgroundColor: "#ffff",
  },
  contestCardNote: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,

    elevation: 5,
  },
  contestCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    elevation: 2,
    borderRadius: 10,
  },
  statuscontest: {
    width: 5,
    height: "100%",
  },
  contentContest: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contestImage: {
    width: 150,
    height: 100,
    borderRadius: 10,

    objectFit: "fill",
  },
  contestTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  contestDate: {
    color: "#555",
    marginBottom: 5,
    fontSize: 12,
  },
});
